'use client';

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

/**
 * The Stripe globe, 1:1, in Sella colors. Rendered by cobe — the WebGL
 * library built to replicate Stripe's globe exactly (Phong-shaded dot
 * matrix on a real 3D sphere, atmosphere glow, city markers). Idle
 * rotation, drag to spin with momentum, particles visible while
 * interacting because it's true 3D, not a scrolling texture.
 */

// the same city pairs the section's trade ticker shows
const markers: { location: [number, number]; size: number }[] = [
	{ location: [24.86, 67.0], size: 0.06 }, // Karachi
	{ location: [52.52, 13.4], size: 0.05 }, // Berlin
	{ location: [-34.6, -58.4], size: 0.06 }, // Buenos Aires
	{ location: [51.5, -0.12], size: 0.05 }, // London
	{ location: [6.45, 3.39], size: 0.06 }, // Lagos
	{ location: [37.56, 126.97], size: 0.05 }, // Seoul
	{ location: [14.6, 120.98], size: 0.06 }, // Manila
	{ location: [-33.87, 151.2], size: 0.05 }, // Sydney
	{ location: [30.04, 31.24], size: 0.06 }, // Cairo
	{ location: [48.85, 2.35], size: 0.05 }, // Paris
	{ location: [21.02, 105.85], size: 0.06 }, // Hanoi
	{ location: [43.65, -79.38], size: 0.05 }, // Toronto
	{ location: [-12.05, -77.04], size: 0.05 }, // Lima
	{ location: [35.68, 139.69], size: 0.05 }, // Tokyo
	{ location: [41.72, 44.78], size: 0.05 }, // Tbilisi
	{ location: [30.27, -97.74], size: 0.05 }, // Austin
];

// trade arcs between the same pairs the ticker announces
const arcs: { from: [number, number]; to: [number, number] }[] = [
	{ from: [24.86, 67.0], to: [52.52, 13.4] }, // Karachi -> Berlin
	{ from: [-34.6, -58.4], to: [51.5, -0.12] }, // Buenos Aires -> London
	{ from: [6.45, 3.39], to: [37.56, 126.97] }, // Lagos -> Seoul
	{ from: [14.6, 120.98], to: [-33.87, 151.2] }, // Manila -> Sydney
	{ from: [30.04, 31.24], to: [48.85, 2.35] }, // Cairo -> Paris
	{ from: [21.02, 105.85], to: [43.65, -79.38] }, // Hanoi -> Toronto
	{ from: [-12.05, -77.04], to: [35.68, 139.69] }, // Lima -> Tokyo
	{ from: [41.72, 44.78], to: [30.27, -97.74] }, // Tbilisi -> Austin
];

export function DottedGlobe() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pointerStart = useRef<number | null>(null);
	const movement = useRef(0);
	const phi = useRef(0);
	const velocity = useRef(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		let width = canvas.offsetWidth;
		const onResize = () => {
			width = canvas.offsetWidth;
			// cobe doesn't size the drawing buffer; do it ourselves
			canvas.width = width * 2;
			canvas.height = width * 2;
		};
		window.addEventListener("resize", onResize);
		onResize();

		const globe = createGlobe(canvas, {
			devicePixelRatio: 2,
			width: width * 2,
			height: width * 2,
			phi: 0,
			theta: 0.18,
			dark: 1,
			diffuse: 1.2,
			mapSamples: 20000,
			mapBrightness: 7,
			baseColor: [1, 0.83, 0.16],
			markerColor: [1, 0.93, 0.45],
			glowColor: [0.24, 0.2, 0.04],
			opacity: 0.95,
			markers,
			arcs,
			arcColor: [1, 0.87, 0.2],
			arcHeight: 0.45,
		});

		// cobe v2 has no onRender: drive rotation with our own rAF loop
		let raf = 0;
		const frame = () => {
			if (pointerStart.current === null) {
				// idle spin plus decaying momentum from the last drag
				phi.current += 0.0035 + velocity.current;
				velocity.current *= 0.94;
			}
			globe.update({
				phi: phi.current + movement.current,
				width: width * 2,
				height: width * 2,
			});
			raf = requestAnimationFrame(frame);
		};
		raf = requestAnimationFrame(frame);

		return () => {
			cancelAnimationFrame(raf);
			globe.destroy();
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="size-full cursor-grab active:cursor-grabbing [contain:layout_paint_size]"
			style={{ aspectRatio: "1" }}
			onPointerDown={(e) => {
				pointerStart.current = e.clientX;
				velocity.current = 0;
				e.currentTarget.setPointerCapture(e.pointerId);
			}}
			onPointerMove={(e) => {
				if (pointerStart.current === null) return;
				const delta = (e.clientX - pointerStart.current) / 140;
				velocity.current = (delta - movement.current) * 0.6;
				movement.current = delta;
			}}
			onPointerUp={() => {
				phi.current += movement.current;
				movement.current = 0;
				pointerStart.current = null;
			}}
			onPointerLeave={() => {
				if (pointerStart.current === null) return;
				phi.current += movement.current;
				movement.current = 0;
				pointerStart.current = null;
			}}
		/>
	);
}
