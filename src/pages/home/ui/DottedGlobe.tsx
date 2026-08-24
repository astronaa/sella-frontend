'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Carbon copy of the Stripe globe (per stripe.com/blog/globe), in
 * Sella gold instead of Stripe blue:
 * - land dots sampled from an equirectangular map into evenly spaced
 *   latitude rings, rendered as one instanced mesh of surface-oriented
 *   discs, lit so the sphere shades as it turns
 * - a dark base sphere with an additive fresnel atmosphere on the rim
 * - transaction arcs (cubic beziers between cities) that draw on,
 *   hold, retract tail-first, and pulse a ring where they land
 * - idle rotation, drag to spin with inertia
 */

const R = 1;
const ROWS = 160; // latitude rings, as in the guide
const DOT_RADIUS = 0.0062;
const TILT_X = 0.22;
const TILT_Z = -0.14;
const IDLE_SPEED = 0.05; // rad/s
const MAX_PITCH = 0.6; // rad of vertical drag either way

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

interface ArcState {
	geometry: THREE.BufferGeometry;
	pointCount: number;
	pulse: THREE.Mesh;
	pulseMaterial: THREE.MeshBasicMaterial;
	offset: number;
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

		const scene = new THREE.Scene();
		// far enough back that the atmosphere shell and the arc peaks stay
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

		// tilted parent, spinning child: drag and idle both drive child.rotation.y
		const tilt = new THREE.Group();
		tilt.rotation.x = TILT_X;
		tilt.rotation.z = TILT_Z;
		scene.add(tilt);
		const globe = new THREE.Group();
		tilt.add(globe);

		// base sphere, kept a touch lighter than the page's #0F0F0F so the
		// ocean hemisphere reads as a lit body, not a hole in the background
		const base = new THREE.Mesh(
			new THREE.SphereGeometry(R * 0.996, 64, 64),
			new THREE.MeshLambertMaterial({ color: 0x1d1b10 })
		);
		globe.add(base);

		// fresnel atmosphere, additive on the back side
		const atmosphere = new THREE.Mesh(
			new THREE.SphereGeometry(R * 1.16, 64, 64),
			new THREE.ShaderMaterial({
				uniforms: { glowColor: { value: new THREE.Color("#5c4c08") } },
				vertexShader: `
					varying vec3 vNormal;
					void main() {
						vNormal = normalize(normalMatrix * normal);
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}`,
				fragmentShader: `
					uniform vec3 glowColor;
					varying vec3 vNormal;
					void main() {
						float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
						gl_FragColor = vec4(glowColor, 1.0) * intensity;
					}`,
				side: THREE.BackSide,
				blending: THREE.AdditiveBlending,
				transparent: true,
				depthWrite: false,
			})
		);
		scene.add(atmosphere);

		const arcStates: ArcState[] = [];
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

			// city markers
			const markerGeometry = new THREE.CircleGeometry(DOT_RADIUS * 2.2, 12);
			const markerMaterial = new THREE.MeshBasicMaterial({ color: GOLD_SOFT });
			for (const [lat, lon] of Object.values(CITIES)) {
				const p = latLonToVec3(lat, lon, R * 1.002);
				const marker = new THREE.Mesh(markerGeometry, markerMaterial);
				marker.position.copy(p);
				marker.lookAt(p.clone().multiplyScalar(2));
				globe.add(marker);
			}

			// transaction arcs: cubic beziers with elevated control points
			ROUTES.forEach(([fromKey, toKey], index) => {
				const from = latLonToVec3(...CITIES[fromKey], R);
				const to = latLonToVec3(...CITIES[toKey], R);
				// capped so even near-antipodal arcs peak inside the frustum
				const distance = from.distanceTo(to);
				const lift = 1 + Math.min(distance * 0.25, 0.3);
				const c1 = from.clone().lerp(to, 0.25).normalize().multiplyScalar(R * lift);
				const c2 = from.clone().lerp(to, 0.75).normalize().multiplyScalar(R * lift);
				const curve = new THREE.CubicBezierCurve3(from, c1, c2, to);
				const pointCount = 81;
				const geometry = new THREE.BufferGeometry().setFromPoints(
					curve.getPoints(pointCount - 1)
				);
				geometry.setDrawRange(0, 0);

				const material = new THREE.LineBasicMaterial({
					color: GOLD,
					transparent: true,
					opacity: 0.85,
					blending: THREE.AdditiveBlending,
					depthWrite: false,
				});
				const line = new THREE.Line(geometry, material);
				globe.add(line);

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

				arcStates.push({ geometry, pointCount, pulse, pulseMaterial, offset: index * 0.65 });
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

		const clock = new THREE.Clock();
		const frame = () => {
			const dt = clock.getDelta();
			const t = clock.elapsedTime;

			if (pointerStart.current === null) {
				rotation.current += IDLE_SPEED * dt + velocity.current;
				velocity.current *= 0.94;
				// vertical drag eases back to the resting tilt
				pitch.current *= Math.pow(0.2, dt);
			}
			globe.rotation.y = rotation.current + movement.current;
			tilt.rotation.x = TILT_X + pitch.current;

			// arc lifecycle via drawRange (the guide's technique): draw on
			// (0-0.3), hold (0.3-0.55), retract tail-first (0.55-0.85),
			// rest hidden; pulse as the head lands
			const PERIOD = 5.2;
			for (const arc of arcStates) {
				const u = ((t + arc.offset * PERIOD) % PERIOD) / PERIOD;
				const n = arc.pointCount;
				if (u < 0.3) {
					arc.geometry.setDrawRange(0, Math.floor(n * (u / 0.3)));
				} else if (u < 0.55) {
					arc.geometry.setDrawRange(0, n);
				} else if (u < 0.85) {
					const start = Math.floor(n * ((u - 0.55) / 0.3));
					arc.geometry.setDrawRange(start, n - start);
				} else {
					arc.geometry.setDrawRange(0, 0);
				}

				const pu = (u - 0.28) / 0.2;
				if (pu >= 0 && pu <= 1) {
					arc.pulseMaterial.opacity = 0.9 * (1 - pu);
					arc.pulse.scale.setScalar(1 + pu * 2.2);
				} else {
					arc.pulseMaterial.opacity = 0;
				}
			}

			renderer.render(scene, camera);
			raf = requestAnimationFrame(frame);
		};
		raf = requestAnimationFrame(frame);

		return () => {
			disposed = true;
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", onResize);
			renderer.dispose();
			scene.traverse((obj) => {
				if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
					obj.geometry.dispose();
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
