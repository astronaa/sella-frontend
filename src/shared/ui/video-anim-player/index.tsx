'use client';

import { HTMLAttributes, useLayoutEffect, useRef, useState } from "react";
import { withBasePath } from "~/shared/config/base-path";
import { cn } from "~/shared/lib/cn";

interface VideoAnimationPlayerProps extends HTMLAttributes<HTMLDivElement> {
	src: string,
	srcHevc?: string,
}

export function VideoAnimationPlayer({ src, srcHevc, children, ...props }: VideoAnimationPlayerProps) {
	const [videoLoaded, setVideoLoaded] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	useLayoutEffect(() => {
		if (videoRef.current)
			videoRef.current.currentTime = 0;
	}, [videoLoaded]);

	return (
		<div {...props}>
			<video
				ref={videoRef}
				autoPlay loop muted playsInline
				className={cn('size-full', !videoLoaded && 'opacity-0 size-0')}
				onTimeUpdate={() => setVideoLoaded(true)}
			>
				{!!srcHevc && <source src={withBasePath(srcHevc)} type='video/quicktime' />}
				<source src={withBasePath(src)} />
			</video>
			{!videoLoaded && children}
		</div>
	);
}
