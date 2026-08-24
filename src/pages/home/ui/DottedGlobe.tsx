'use client';

import { useEffect, useRef } from "react";
import { cn } from "~/shared/lib/cn";

/**
 * Stripe-style interactive Earth in Sella colors: a solid dark sphere,
 * land pixels of /world-map.svg sampled onto a Fibonacci sphere as gold
 * dots, a particle atmosphere spraying off the limb, and animated
 * great-circle trade arcs between the same city pairs the section's
 * ticker shows. Drag to spin; released momentum eases back into the
 * idle rotation.
 */

// world-map.svg viewBox is "0 15 1000 390" of a 1000x500 equirectangular
// frame: longitude -180..180 maps to x 0..1000, latitude 90..-90 maps to
// y 0..500, cropped to y 15..405 (no Antarctica, no empty polar band).
const MAP_W = 1000;
const MAP_H = 390;
const MAP_Y0 = 15;
const FULL_H = 500;

const DOT_COUNT = 26000;
const HALO_COUNT = 2200;
const TILT = -0.32; // radians, decorative axial tilt
const IDLE_SPEED = (Math.PI * 2) / 110; // rad/s
const ARC_LIFT = 0.22;

// deterministic per-index randomness so StrictMode double-mounts and
// re-renders always draw the same globe
function hash(i: number) {
	const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
}

function latLonToVec(lat: number, lon: number): [number, number, number] {
	const la = (lat * Math.PI) / 180;
	const lo = (lon * Math.PI) / 180;
	return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)];
}

// same pairs as the trades ticker below the globe
const routes: Array<[[number, number], [number, number]]> = [
	[[24.86, 67.0], [52.52, 13.4]], // Karachi -> Berlin
	[[-34.6, -58.4], [51.5, -0.13]], // Buenos Aires -> London
	[[6.45, 3.39], [37.57, 126.98]], // Lagos -> Seoul
	[[14.6, 121.0], [-33.87, 151.2]], // Manila -> Sydney
	[[30.04, 31.24], [48.86, 2.35]], // Cairo -> Paris
	[[21.03, 105.85], [43.65, -79.38]], // Hanoi -> Toronto
	[[-12.05, -77.04], [35.68, 139.69]], // Lima -> Tokyo
	[[41.72, 44.79], [30.27, -97.74]], // Tbilisi -> Austin
];

const arcColors = ["#ffdd00", "#ffb547", "#fff3b0", "#ffffff"];

type Sphere = {
	land: Float32Array;
	landSize: Float32Array;
	halo: Float32Array; // x, y (unit disc direction), radius factor, alpha
};

async function sampleSphere(): Promise<Sphere> {
	const img = new Image();
	img.src = "/world-map.svg";
	await img.decode();

	const canvas = document.createElement("canvas");
	canvas.width = MAP_W;
	canvas.height = MAP_H;
	const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
	ctx.drawImage(img, 0, 0, MAP_W, MAP_H);
	const pixels = ctx.getImageData(0, 0, MAP_W, MAP_H).data;

	const land: number[] = [];
	const landSize: number[] = [];
	const golden = Math.PI * (3 - Math.sqrt(5));

	for (let i = 0; i < DOT_COUNT; i++) {
		const y = 1 - (2 * (i + 0.5)) / DOT_COUNT;
		const radius = Math.sqrt(1 - y * y);
		const phi = i * golden;
		const x = Math.cos(phi) * radius;
		const z = Math.sin(phi) * radius;

		const lat = Math.asin(y);
		const lon = Math.atan2(z, x);
		const mapX = Math.floor(((lon / Math.PI + 1) / 2) * MAP_W) % MAP_W;
		const mapY = Math.floor((0.5 - lat / Math.PI) * FULL_H - MAP_Y0);

		if (mapY >= 0 && mapY < MAP_H && pixels[(mapY * MAP_W + mapX) * 4 + 3] > 128) {
			land.push(x, y, z);
			landSize.push(0.75 + hash(i) * 0.5);
		}
	}

	const halo: number[] = [];
	for (let i = 0; i < HALO_COUNT; i++) {
		const angle = hash(i * 2 + 1) * Math.PI * 2;
		// bias the spray toward the limb, thinning out with distance
		const spread = Math.pow(hash(i * 2 + 2), 2.2);
		const r = 1.005 + spread * 0.16;
		halo.push(Math.cos(angle), Math.sin(angle), r, (1 - spread) * 0.5 * (0.4 + hash(i * 3) * 0.6));
	}

	return {
		land: new Float32Array(land),
		landSize: new Float32Array(landSize),
		halo: new Float32Array(halo),
	};
}

type ArcState = { a: [number, number, number]; b: [number, number, number]; omega: number; color: string; offset: number };

const ARC_PERIOD = 6.5; // seconds per arc lifecycle

function buildArcs(): ArcState[] {
	return routes.map(([from, to], i) => {
		const a = latLonToVec(from[0], from[1]);
		const b = latLonToVec(to[0], to[1]);
		const omega = Math.acos(a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
		return {
			a,
			b,
			omega,
			color: arcColors[i % arcColors.length],
			offset: (i * ARC_PERIOD * 1.45) / routes.length,
		};
	});
}

export function DottedGlobe({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let sphere: Sphere | null = null;
		const arcs = buildArcs();
		let raf = 0;
		let visible = true;
		let disposed = false;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		// rotation state: idle spin + user drag with momentum
		let theta = -1.22; // Africa and Europe facing the viewer
		let pitch = TILT;
		let speed = IDLE_SPEED;
		let dragging = false;
		let lastX = 0;
		let lastY = 0;
		let lastMove = 0;
		let lastFrame: number | null = null;

		const fit = () => {
			const cssSize = canvas.clientWidth;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const px = Math.round(cssSize * dpr);
			if (canvas.width !== px) {
				canvas.width = px;
				canvas.height = px;
			}
			return px;
		};

		const draw = (size: number, now: number) => {
			if (!sphere) return;
			const c = size / 2;
			const r = size / 2 / 1.17; // leave room for the halo spray
			ctx.clearRect(0, 0, size, size);

			const sinT = Math.sin(theta);
			const cosT = Math.cos(theta);
			const sinP = Math.sin(pitch);
			const cosP = Math.cos(pitch);
			const rotate = (x0: number, y0: number, z0: number): [number, number, number] => {
				const x = x0 * cosT + z0 * sinT;
				const zSpun = z0 * cosT - x0 * sinT;
				return [x, y0 * cosP - zSpun * sinP, y0 * sinP + zSpun * cosP];
			};

			// particle atmosphere spraying off the limb
			const halo = sphere.halo;
			ctx.fillStyle = "#ffe466";
			for (let i = 0; i < halo.length; i += 4) {
				const hr = halo[i + 2] * r;
				ctx.globalAlpha = halo[i + 3];
				ctx.fillRect(c + halo[i] * hr, c + halo[i + 1] * hr, 1.2, 1.2);
			}

			// solid sphere body, lit from the upper left
			const body = ctx.createRadialGradient(c - r * 0.35, c - r * 0.45, r * 0.1, c, c, r);
			body.addColorStop(0, "#2b2612");
			body.addColorStop(0.55, "#1c190c");
			body.addColorStop(1, "#0f0d06");
			ctx.globalAlpha = 1;
			ctx.fillStyle = body;
			ctx.beginPath();
			ctx.arc(c, c, r, 0, Math.PI * 2);
			ctx.fill();

			// gold land dots
			const land = sphere.land;
			const dotR = Math.max(size / 620, 0.9);
			ctx.fillStyle = "#ffdd00";
			for (let i = 0, j = 0; i < land.length; i += 3, j++) {
				const [x, y, z] = rotate(land[i], land[i + 1], land[i + 2]);
				if (z < 0.02) continue;
				const s = dotR * sphere.landSize[j] * (0.7 + 0.5 * z);
				ctx.globalAlpha = (0.28 + 0.72 * z) * 0.95;
				ctx.fillRect(c + x * r - s, c - y * r - s, s * 2, s * 2);
			}

			// trade arcs: grow from origin, land, fade
			const lineW = Math.max(size / 760, 1);
			for (const arc of arcs) {
				const phase = ((now + arc.offset * 1000) / 1000) % (ARC_PERIOD * 1.6);
				const t = phase / ARC_PERIOD;
				if (t > 1.25) continue;
				const head = Math.min(1, t * 1.35);
				const tail = Math.max(0, t * 1.35 - 0.55);
				const fade = t > 1 ? 1 - (t - 1) / 0.25 : 1;
				if (head <= tail) continue;

				ctx.strokeStyle = arc.color;
				ctx.lineWidth = lineW;
				ctx.beginPath();
				let pen = false;
				const steps = 56;
				for (let s = 0; s <= steps; s++) {
					const tt = tail + ((head - tail) * s) / steps;
					const k1 = Math.sin((1 - tt) * arc.omega) / Math.sin(arc.omega);
					const k2 = Math.sin(tt * arc.omega) / Math.sin(arc.omega);
					const lift = 1 + ARC_LIFT * Math.sin(Math.PI * tt);
					const [x, y, z] = rotate(
						(arc.a[0] * k1 + arc.b[0] * k2) * lift,
						(arc.a[1] * k1 + arc.b[1] * k2) * lift,
						(arc.a[2] * k1 + arc.b[2] * k2) * lift,
					);
					// occluded when behind the sphere silhouette
					if (z < 0 && x * x + y * y < 1) {
						pen = false;
						continue;
					}
					const px = c + x * r;
					const py = c - y * r;
					if (pen) ctx.lineTo(px, py);
					else ctx.moveTo(px, py);
					pen = true;
				}
				ctx.globalAlpha = 0.85 * fade;
				ctx.stroke();

				// endpoint rings at takeoff and, once the head lands, arrival
				const ring = (v: [number, number, number], alpha: number) => {
					const [x, y, z] = rotate(v[0], v[1], v[2]);
					if (z < 0.02) return;
					ctx.globalAlpha = alpha * fade;
					ctx.beginPath();
					ctx.arc(c + x * r, c - y * r, lineW * 2.6, 0, Math.PI * 2);
					ctx.stroke();
				};
				ring(arc.a, 0.7);
				if (head >= 1) ring(arc.b, 0.9);
			}

			// limb shading keeps the edge soft without a stroke
			ctx.globalAlpha = 1;
			const limb = ctx.createRadialGradient(c, c, r * 0.82, c, c, r);
			limb.addColorStop(0, "rgba(5, 5, 8, 0)");
			limb.addColorStop(1, "rgba(5, 5, 8, 0.55)");
			ctx.fillStyle = limb;
			ctx.beginPath();
			ctx.arc(c, c, r, 0, Math.PI * 2);
			ctx.fill();
		};

		const frame = (now: number) => {
			if (disposed) return;
			if (sphere && visible) {
				const dt = lastFrame === null ? 0 : Math.min((now - lastFrame) / 1000, 0.1);
				lastFrame = now;
				if (!dragging) {
					theta += speed * dt;
					// momentum from a fling eases back into the idle spin
					speed += (IDLE_SPEED - speed) * Math.min(1, dt * 1.6);
					pitch += (TILT - pitch) * Math.min(1, dt * 1.2);
				}
				draw(fit(), now);
			} else {
				lastFrame = null;
			}
			if (!reducedMotion) raf = requestAnimationFrame(frame);
		};

		const onPointerDown = (e: PointerEvent) => {
			dragging = true;
			lastX = e.clientX;
			lastY = e.clientY;
			lastMove = performance.now();
			canvas.setPointerCapture(e.pointerId);
			canvas.style.cursor = "grabbing";
		};
		const onPointerMove = (e: PointerEvent) => {
			if (!dragging) return;
			const now = performance.now();
			const dx = e.clientX - lastX;
			const dy = e.clientY - lastY;
			const k = 1 / (canvas.clientWidth * 0.45);
			theta += dx * k;
			pitch = Math.max(-0.9, Math.min(0.9, pitch - dy * k));
			const dt = Math.max((now - lastMove) / 1000, 1 / 120);
			speed = Math.max(-3, Math.min(3, (dx * k) / dt));
			lastX = e.clientX;
			lastY = e.clientY;
			lastMove = now;
			if (reducedMotion && sphere) draw(fit(), now);
		};
		const onPointerUp = () => {
			dragging = false;
			canvas.style.cursor = "grab";
		};
		canvas.addEventListener("pointerdown", onPointerDown);
		canvas.addEventListener("pointermove", onPointerMove);
		canvas.addEventListener("pointerup", onPointerUp);
		canvas.addEventListener("pointercancel", onPointerUp);
		canvas.style.cursor = "grab";
		canvas.style.touchAction = "pan-y";

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
		});
		observer.observe(canvas);

		const onResize = () => {
			if (reducedMotion && sphere) draw(fit(), performance.now());
		};
		window.addEventListener("resize", onResize);

		sampleSphere().then(sampled => {
			if (disposed) return;
			sphere = sampled;
			if (reducedMotion) {
				draw(fit(), performance.now());
			} else {
				raf = requestAnimationFrame(frame);
			}
		});
		if (!reducedMotion) raf = requestAnimationFrame(frame);

		return () => {
			disposed = true;
			cancelAnimationFrame(raf);
			observer.disconnect();
			window.removeEventListener("resize", onResize);
			canvas.removeEventListener("pointerdown", onPointerDown);
			canvas.removeEventListener("pointermove", onPointerMove);
			canvas.removeEventListener("pointerup", onPointerUp);
			canvas.removeEventListener("pointercancel", onPointerUp);
		};
	}, []);

	return <canvas ref={canvasRef} className={cn("size-full", className)} />;
}
