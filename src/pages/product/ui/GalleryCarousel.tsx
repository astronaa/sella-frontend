import { PreviewImage } from "~/shared/ui/image";
import { Carousel, Dialog } from "~/shared/ui/kit";
import { cn } from "~/shared/lib/cn";
import { Scrollable } from "~/shared/ui/scrollable";
import { useState } from "react";
import { Portal } from "@ark-ui/react";
import NextImage from "next/image";

export function GalleryCarousel(props: { images: string[] }) {
	const images = props.images.length > 0 ? props.images : [null];
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const currentImage = images[currentIndex];

	return (
		<>
			<Carousel.Root
				className='w-full'
				onIndexChange={(details) => setCurrentIndex(details.index)}
			>
				<Carousel.Viewport
					className='w-full h-[18.625rem] lg:h-[27.125rem] overflow-hidden bg-white/[.04] cursor-pointer'
					onClick={() => {
						if (currentImage !== null) {
							setIsFullscreen(true);
						}
					}}
				>
					<Carousel.ItemGroup className='!h-full'>
						{images.map((image, index) => (
							<Carousel.Item
								key={index} index={index}
								className='flex items-center justify-center max-h-full'
							>
								<PreviewImage
									src={image}
									alt={`Slide ${index}`}
									width={1440}
									height={1080}
									sizes='(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px'
									className={cn('w-full h-auto max-h-full', image === null && 'h-full')}
									priority={index === 0}
								/>
							</Carousel.Item>
						))}
					</Carousel.ItemGroup>
				</Carousel.Viewport>

			{images[0] !== null && (
				<Carousel.Control className='overflow-hidden' asChild>
					<Scrollable.Root className='p-[0.25rem]'>
						<Scrollable.Container asChild>
							<Carousel.IndicatorGroup>
								{images.map((image, index) => (
									<Carousel.Indicator
										key={index} index={index}
										aria-label={`Goto slide ${index + 1}`}
										className='rounded-[1rem] w-full flex-shrink-0 select-none'
										onClick={e => e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })}
									>
										<PreviewImage
											src={image}
											alt={`Indicator ${index}`}
											width={146} height={80}
											className='size-full'
											draggable={false}
										/>
									</Carousel.Indicator>
								))}
							</Carousel.IndicatorGroup>
						</Scrollable.Container>
					</Scrollable.Root>
				</Carousel.Control>
			)}
			</Carousel.Root>

			<Dialog.Root open={isFullscreen} onOpenChange={(details) => setIsFullscreen(details.open)}>
				<Portal>
					<Dialog.Backdrop className='fixed inset-0 bg-black/95' />
					<Dialog.Positioner className='fixed inset-0 flex items-center justify-center p-4'>
						<Dialog.Content className='relative w-full h-full flex items-center justify-center bg-transparent border-none p-0 gap-0'>
							<Dialog.CloseButton className='absolute top-4 right-4 z-10 text-white hover:text-white/70' />
							{currentImage && (
								<div className='relative w-full h-full flex items-center justify-center'>
									<NextImage
										src={currentImage}
										alt='Fullscreen view'
										fill
										className='object-contain w-full h-full'
										priority
										quality={95}
										sizes='100vw'
									/>
								</div>
							)}
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</>
	);
}

