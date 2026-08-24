'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The Stripe globe (per stripe.com/blog/globe) pushed to showpiece
 * level, in Sella gold:
 * - land dots sampled from an equirectangular map into evenly spaced
 *   latitude rings, rendered as one instanced mesh of surface-oriented
 *   discs, lit so the sphere shades as it turns
 * - a dark base sphere with a bright fresnel rim ON the limb plus a
 *   wide additive halo behind it, biased warmer at the bottom like a
 *   sun about to rise behind the planet
 * - transaction arcs as volumetric tubes led by a comet head: draw on,
 *   hold, retract tail-first, and pulse a ring where they land
 * - every city breathes a slow radar ping on its own phase
 * - a sparse field of gold dust floating behind the sphere for depth
 * - the whole scene scales and sweeps in the first time it enters the
 *   viewport, and pauses rendering while offscreen
 * - idle rotation, drag to spin with inertia on both axes
 */

const R = 1;
const ROWS = 160; // latitude rings, as in the guide
const DOT_RADIUS = 0.0062;
const TILT_X = 0.22;
const TILT_Z = -0.14;
const IDLE_SPEED = 0.05; // rad/s
const MAX_PITCH = 0.6; // rad of vertical drag either way
const ARC_TUBULAR = 96;
const ARC_RADIAL = 6;
const ENTRANCE_SECONDS = 1.25;

// world-map.svg: viewBox "0 15 1000 390" of a 1000x500 equirectangular
// frame (poles cropped)
const MAP_W = 1000;
const MAP_H = 390;
const MAP_Y0 = 15;
const FULL_H = 500;

const GOLD = new THREE.Color("#ffdd00");
const GOLD_SOFT = new THREE.Color("#ffe865");

// the same city pairs the section's trade ticker announces
const CITIES: Record<string, [number, number]> = {
	karachi: [24.86, 67.0],
	berlin: [52.52, 13.4],
	buenosaires: [-34.6, -58.4],
	london: [51.5, -0.12],
	lagos: [6.45, 3.39],
	seoul: [37.56, 126.97],
	manila: [14.6, 120.98],
	sydney: [-33.87, 151.2],
	cairo: [30.04, 31.24],
	paris: [48.85, 2.35],
	hanoi: [21.02, 105.85],
	toronto: [43.65, -79.38],
	lima: [-12.05, -77.04],
	tokyo: [35.68, 139.69],
	tbilisi: [41.72, 44.78],
	austin: [30.27, -97.74],
};

const ROUTES: [string, string][] = [
	["karachi", "berlin"],
	["buenosaires", "london"],
	["lagos", "seoul"],
	["manila", "sydney"],
	["cairo", "paris"],
	["hanoi", "toronto"],
	["lima", "tokyo"],
	["tbilisi", "austin"],
];

function latLonToVec3(lat: number, lon: number, radius: number) {
	const la = (lat * Math.PI) / 180;
	const lo = (lon * Math.PI) / 180;
	return new THREE.Vector3(
		radius * Math.cos(la) * Math.cos(lo),
		radius * Math.sin(la),
		-radius * Math.cos(la) * Math.sin(lo)
	);
}

/* rasterize the SVG map once and answer "is this lat/lon land?" */
async function loadLandSampler(): Promise<(lat: number, lon: number) => boolean> {
	const img = new Image();
	img.src = "/world-map.svg";
	await img.decode();

	const canvas = document.createElement("canvas");
	canvas.width = MAP_W;
	canvas.height = MAP_H;
	const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
	ctx.drawImage(img, 0, 0, MAP_W, MAP_H);
	const data = ctx.getImageData(0, 0, MAP_W, MAP_H).data;

	return (lat, lon) => {
		const x = Math.floor(((lon + 180) / 360) * MAP_W);
		const yFull = ((90 - lat) / 180) * FULL_H;
		const y = Math.floor(yFull - MAP_Y0);
		if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return false;
		return data[(y * MAP_W + x) * 4 + 3] > 30;
	};
}

/* the guide's dot layout: evenly spaced rings of evenly spaced dots,
   keeping only the ones that land on land */
function buildLandDots(isLand: (lat: number, lon: number) => boolean) {
	const positions: THREE.Vector3[] = [];
	for (let row = 0; row < ROWS; row++) {
		const lat = -90 + ((row + 0.5) / ROWS) * 180;
		const ringCircumference = Math.cos((lat * Math.PI) / 180) * Math.PI * 2;
		const count = Math.max(1, Math.floor((ringCircumference / (Math.PI * 2)) * ROWS * 2));
		for (let i = 0; i < count; i++) {
			const lon = -180 + ((i + 0.5) / count) * 360;
			if (isLand(lat, lon)) positions.push(latLonToVec3(lat, lon, R));
		}
	}
	return positions;
}

/* soft round glow used by comet heads: white core into gold into air */
function makeGlowTexture() {
	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = 64;
	const ctx = canvas.getContext("2d")!;
	const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
	grad.addColorStop(0, "rgba(255,255,255,1)");
	grad.addColorStop(0.25, "rgba(255,232,101,0.9)");
	grad.addColorStop(0.6, "rgba(255,221,0,0.22)");
	grad.addColorStop(1, "rgba(255,221,0,0)");
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, 64, 64);
	return new THREE.CanvasTexture(canvas);
}

/* mild overshoot for the entrance so the arrival has a heartbeat */
function easeOutBack(x: number) {
	const c1 = 0.9;
	const c3 = c1 + 1;
	return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

interface ArcState {
	geometry: THREE.BufferGeometry;
	indexTotal: number;
	curve: THREE.CubicBezierCurve3;
	head: THREE.Sprite;
	headMaterial: THREE.SpriteMaterial;
	pulse: THREE.Mesh;
	pulseMaterial: THREE.MeshBasicMaterial;
	offset: number;
}

interface PingState {
	mesh: THREE.Mesh;
	material: THREE.MeshBasicMaterial;
	phase: number;
}

export function DottedGlobe() {
	const containerRef = useRef<HTMLDivElement>(null);
	const pointerStart = useRef<{ x: number; y: number } | null>(null);
	const movement = useRef(0);
	const rotation = useRef(0.8);
	const velocity = useRef(0);
	const pitch = useRef(0);
	const pitchStart = useRef(0);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let disposed = false;
		let raf = 0;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		// no WebGL (some headless/ancient environments): show nothing
		// rather than crashing the whole page tree
		let renderer: THREE.WebGLRenderer;
		try {
			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		} catch {
			try {
				renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
			} catch {
				return;
			}
		}
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		renderer.domElement.style.opacity = "0";
		renderer.domElement.style.transition = "opacity 0.9s ease";

		const scene = new THREE.Scene();
		// far enough back that the halo shell and the arc peaks stay
		// inside the frustum instead of shearing flat at the canvas edges
		const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 10);
		camera.position.set(0, 0, 5.0);

		scene.add(new THREE.AmbientLight(0xffffff, 0.85));
		const sun = new THREE.DirectionalLight(0xffffff, 1.1);
		sun.position.set(-1.4, 0.8, 1.6);
		scene.add(sun);
		// faint fill from the other side so the night hemisphere keeps dim
		// dots instead of collapsing into a black disc against the page
		const fill = new THREE.DirectionalLight(0xffe865, 0.22);
		fill.position.set(1.6, -0.4, 0.8);
		scene.add(fill);

		// everything that should breathe in together on arrival
		const stage = new THREE.Group();
		scene.add(stage);

		// tilted parent, spinning child: drag and idle both drive child.rotation.y
		const tilt = new THREE.Group();
		tilt.rotation.x = TILT_X;
		tilt.rotation.z = TILT_Z;
		stage.add(tilt);
		const globe = new THREE.Group();
		tilt.add(globe);

		// base sphere, kept a touch lighter than the page's #0F0F0F so the
		// ocean hemisphere reads as a lit body, not a hole in the background
		const base = new THREE.Mesh(
			new THREE.SphereGeometry(R * 0.996, 64, 64),
			new THREE.MeshLambertMaterial({ color: 0x1d1b10 })
		);
		globe.add(base);

		// bright fresnel rim painted on the limb itself — the sphere's
		// silhouette becomes a luminous gold edge instead of a soft fade
		const rim = new THREE.Mesh(
			new THREE.SphereGeometry(R * 1.004, 64, 64),
			new THREE.ShaderMaterial({
				uniforms: { rimColor: { value: new THREE.Color("#ffdd44") } },
				vertexShader: `
					varying vec3 vNormal;
					void main() {
						vNormal = normalize(normalMatrix * normal);
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}`,
				fragmentShader: `
					uniform vec3 rimColor;
					varying vec3 vNormal;
					void main() {
						float edge = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 4.5);
						gl_FragColor = vec4(rimColor, 1.0) * edge * 1.15;
					}`,
				blending: THREE.AdditiveBlending,
				transparent: true,
				depthWrite: false,
			})
		);
		stage.add(rim);

		// wide halo behind the sphere, warmer toward the bottom so the
		// planet sits on a faint sunrise instead of floating in a void
		const halo = new THREE.Mesh(
			new THREE.SphereGeometry(R * 1.22, 64, 64),
			new THREE.ShaderMaterial({
				uniforms: { glowColor: { value: new THREE.Color("#7d680e") } },
				vertexShader: `
					varying vec3 vNormal;
					varying float vY;
					void main() {
						vNormal = normalize(normalMatrix * normal);
						vY = position.y / ${(R * 1.22).toFixed(3)};
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}`,
				fragmentShader: `
					uniform vec3 glowColor;
					varying vec3 vNormal;
					varying float vY;
					void main() {
						float intensity = pow(0.74 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
						intensity *= 1.05 - 0.3 * vY;
						gl_FragColor = vec4(glowColor, 1.0) * intensity;
					}`,
				side: THREE.BackSide,
				blending: THREE.AdditiveBlending,
				transparent: true,
				depthWrite: false,
			})
		);
		stage.add(halo);

		// sparse gold dust drifting behind the sphere for depth; kept in a
		// round cloud so it can never draw a straight edge at the canvas
		const dustCount = 150;
		const dustPositions = new Float32Array(dustCount * 3);
		for (let i = 0; i < dustCount; i++) {
			const angle = Math.random() * Math.PI * 2;
			const radius = 1.02 + Math.pow(Math.random(), 0.6) * 0.38;
			dustPositions[i * 3] = Math.cos(angle) * radius;
			dustPositions[i * 3 + 1] = Math.sin(angle) * radius;
			dustPositions[i * 3 + 2] = -1.0 - Math.random() * 0.9;
		}
		const dustGeometry = new THREE.BufferGeometry();
		dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
		const dustMaterial = new THREE.PointsMaterial({
			color: 0xbb9a1a,
			size: 0.014,
			transparent: true,
			opacity: 0.4,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
		});
		const dust = new THREE.Points(dustGeometry, dustMaterial);
		stage.add(dust);

		const glowTexture = makeGlowTexture();
		const arcStates: ArcState[] = [];
		const pingStates: PingState[] = [];
		let dots: THREE.InstancedMesh | null = null;

		loadLandSampler().then((isLand) => {
			if (disposed) return;

			// instanced surface-oriented discs, one per land dot
			const points = buildLandDots(isLand);
			const disc = new THREE.CircleGeometry(DOT_RADIUS, 6);
			const dotMaterial = new THREE.MeshLambertMaterial({
				color: GOLD,
				side: THREE.DoubleSide,
			});
			dots = new THREE.InstancedMesh(disc, dotMaterial, points.length);
			const dummy = new THREE.Object3D();
			points.forEach((p, i) => {
				dummy.position.copy(p);
				dummy.lookAt(p.clone().multiplyScalar(2));
				dummy.updateMatrix();
				dots!.setMatrixAt(i, dummy.matrix);
			});
			globe.add(dots);

			// city markers, each with a slow radar ping on its own phase
			const markerGeometry = new THREE.CircleGeometry(DOT_RADIUS * 2.2, 12);
			const markerMaterial = new THREE.MeshBasicMaterial({ color: GOLD_SOFT });
			const pingGeometry = new THREE.RingGeometry(DOT_RADIUS * 2.0, DOT_RADIUS * 2.7, 24);
			Object.values(CITIES).forEach(([lat, lon], index) => {
				const p = latLonToVec3(lat, lon, R * 1.002);
				const marker = new THREE.Mesh(markerGeometry, markerMaterial);
				marker.position.copy(p);
				marker.lookAt(p.clone().multiplyScalar(2));
				globe.add(marker);

				const pingMaterial = new THREE.MeshBasicMaterial({
					color: GOLD_SOFT,
					transparent: true,
					opacity: 0,
					side: THREE.DoubleSide,
					blending: THREE.AdditiveBlending,
					depthWrite: false,
				});
				const ping = new THREE.Mesh(pingGeometry, pingMaterial);
				const pingAt = latLonToVec3(lat, lon, R * 1.003);
				ping.position.copy(pingAt);
				ping.lookAt(pingAt.clone().multiplyScalar(2));
				globe.add(ping);
				pingStates.push({ mesh: ping, material: pingMaterial, phase: index * 0.618 });
			});

			// transaction arcs: volumetric tubes along cubic beziers, capped
			// so even near-antipodal arcs peak inside the frustum
			ROUTES.forEach(([fromKey, toKey], index) => {
				const from = latLonToVec3(...CITIES[fromKey], R);
				const to = latLonToVec3(...CITIES[toKey], R);
				const distance = from.distanceTo(to);
				const lift = 1 + Math.min(distance * 0.25, 0.3);
				const c1 = from.clone().lerp(to, 0.25).normalize().multiplyScalar(R * lift);
				const c2 = from.clone().lerp(to, 0.75).normalize().multiplyScalar(R * lift);
				const curve = new THREE.CubicBezierCurve3(from, c1, c2, to);
				const geometry = new THREE.TubeGeometry(curve, ARC_TUBULAR, 0.0042, ARC_RADIAL, false);
				geometry.setDrawRange(0, 0);

				const material = new THREE.MeshBasicMaterial({
					color: GOLD,
					transparent: true,
					opacity: 0.55,
					blending: THREE.AdditiveBlending,
					depthWrite: false,
				});
				const tube = new THREE.Mesh(geometry, material);
				globe.add(tube);

				// comet head leading the draw
				const headMaterial = new THREE.SpriteMaterial({
					map: glowTexture,
					color: GOLD_SOFT,
					transparent: true,
					opacity: 0,
					blending: THREE.AdditiveBlending,
					depthWrite: false,
				});
				const head = new THREE.Sprite(headMaterial);
				head.scale.setScalar(0.085);
				globe.add(head);

				// landing pulse ring at the destination
				const pulseMaterial = new THREE.MeshBasicMaterial({
					color: GOLD_SOFT,
					transparent: true,
					opacity: 0,
					side: THREE.DoubleSide,
					blending: THREE.AdditiveBlending,
					depthWrite: false,
				});
				const pulse = new THREE.Mesh(
					new THREE.RingGeometry(DOT_RADIUS * 2.6, DOT_RADIUS * 3.4, 24),
					pulseMaterial
				);
				const pulseAt = latLonToVec3(...CITIES[toKey], R * 1.004);
				pulse.position.copy(pulseAt);
				pulse.lookAt(pulseAt.clone().multiplyScalar(2));
				globe.add(pulse);

				arcStates.push({
					geometry,
					indexTotal: ARC_TUBULAR * ARC_RADIAL * 6,
					curve,
					head,
					headMaterial,
					pulse,
					pulseMaterial,
					offset: index * 0.65,
				});
			});
		});

		let width = 0;
		const onResize = () => {
			width = container.offsetWidth;
			renderer.setSize(width, width, false);
			camera.aspect = 1;
			camera.updateProjectionMatrix();
		};
		window.addEventListener("resize", onResize);
		onResize();

		// the scene sleeps offscreen and makes an entrance the first time
		// it's actually looked at: fade in, scale up with a slight
		// overshoot, and a spin sweep that decays into the idle drift
		let running = false;
		let entranceStart: number | null = null;
		const clock = new THREE.Clock();
		const observer = new IntersectionObserver(
			([entry]) => {
				running = entry.isIntersecting;
				if (entry.isIntersecting && entranceStart === null) {
					entranceStart = clock.elapsedTime;
					renderer.domElement.style.opacity = "1";
					if (!reducedMotion) velocity.current = 0.03;
				}
			},
			{ threshold: 0.2 }
		);
		observer.observe(container);

		const frame = () => {
			const dt = clock.getDelta();
			const t = clock.elapsedTime;
			raf = requestAnimationFrame(frame);
			if (!running) return;

			if (pointerStart.current === null) {
				rotation.current += (reducedMotion ? 0 : IDLE_SPEED * dt) + velocity.current;
				velocity.current *= 0.94;
				// vertical drag eases back to the resting tilt
				pitch.current *= Math.pow(0.2, dt);
			}
			globe.rotation.y = rotation.current + movement.current;
			tilt.rotation.x = TILT_X + pitch.current;

			if (entranceStart !== null && !reducedMotion) {
				const e = Math.min((t - entranceStart) / ENTRANCE_SECONDS, 1);
				stage.scale.setScalar(0.82 + 0.18 * easeOutBack(e));
			}

			// arc lifecycle via drawRange (the guide's technique, on tube
			// indices): draw on (0-0.3) led by the comet head, hold
			// (0.3-0.55), retract tail-first (0.55-0.85), rest hidden;
			// pulse as the head lands
			const PERIOD = 5.2;
			for (const arc of arcStates) {
				const u = ((t + arc.offset * PERIOD) % PERIOD) / PERIOD;
				const n = arc.indexTotal;
				const ring = ARC_RADIAL * 6;
				if (reducedMotion) {
					arc.geometry.setDrawRange(0, n);
					arc.headMaterial.opacity = 0;
					arc.pulseMaterial.opacity = 0;
					continue;
				}
				if (u < 0.3) {
					const f = u / 0.3;
					arc.geometry.setDrawRange(0, Math.floor((ARC_TUBULAR * f)) * ring);
					arc.head.position.copy(arc.curve.getPoint(f));
					arc.headMaterial.opacity = Math.min(1, f * 6);
				} else if (u < 0.55) {
					arc.geometry.setDrawRange(0, n);
					// head burns out right where it landed
					arc.head.position.copy(arc.curve.getPoint(1));
					arc.headMaterial.opacity = Math.max(0, 1 - (u - 0.3) / 0.08);
				} else if (u < 0.85) {
					const start = Math.floor(ARC_TUBULAR * ((u - 0.55) / 0.3)) * ring;
					arc.geometry.setDrawRange(start, n - start);
					arc.headMaterial.opacity = 0;
				} else {
					arc.geometry.setDrawRange(0, 0);
					arc.headMaterial.opacity = 0;
				}

				const pu = (u - 0.28) / 0.2;
				if (pu >= 0 && pu <= 1) {
					arc.pulseMaterial.opacity = 0.9 * (1 - pu);
					arc.pulse.scale.setScalar(1 + pu * 2.2);
				} else {
					arc.pulseMaterial.opacity = 0;
				}
			}

			// slow radar pings so the cities feel inhabited between arcs
			if (!reducedMotion) {
				for (const ping of pingStates) {
					const p = (t / 4 + ping.phase) % 1;
					ping.mesh.scale.setScalar(1 + p * 2.4);
					ping.material.opacity = 0.3 * Math.pow(1 - p, 1.6);
				}
			}

			renderer.render(scene, camera);
		};
		raf = requestAnimationFrame(frame);

		return () => {
			disposed = true;
			cancelAnimationFrame(raf);
			observer.disconnect();
			window.removeEventListener("resize", onResize);
			renderer.dispose();
			glowTexture.dispose();
			scene.traverse((obj) => {
				if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points || obj instanceof THREE.Sprite) {
					obj.geometry?.dispose();
					const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
					mats.forEach((m) => m.dispose());
				}
			});
			container.removeChild(renderer.domElement);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative size-full cursor-grab active:cursor-grabbing touch-pan-y select-none"
			aria-hidden
			onPointerDown={(e) => {
				e.preventDefault(); // no text-selection drag starting on the globe
				pointerStart.current = { x: e.clientX, y: e.clientY };
				pitchStart.current = pitch.current;
				velocity.current = 0;
				try {
					e.currentTarget.setPointerCapture(e.pointerId);
				} catch {
					// synthetic events have no active pointer; drag still works
				}
			}}
			onPointerMove={(e) => {
				if (pointerStart.current === null) return;
				const delta = (e.clientX - pointerStart.current.x) / 160;
				velocity.current = (delta - movement.current) * 0.5;
				movement.current = delta;
				// natural trackball: the surface follows the pointer both ways
				pitch.current = THREE.MathUtils.clamp(
					pitchStart.current + (e.clientY - pointerStart.current.y) / 220,
					-MAX_PITCH,
					MAX_PITCH
				);
			}}
			onPointerUp={() => {
				rotation.current += movement.current;
				movement.current = 0;
				pointerStart.current = null;
			}}
			onPointerLeave={() => {
				if (pointerStart.current === null) return;
				rotation.current += movement.current;
				movement.current = 0;
				pointerStart.current = null;
			}}
		/>
	);
}
