import { PreviewImage } from "~/shared/ui/image";
import { Carousel } from "~/shared/ui/kit";
import { cn } from "~/shared/lib/cn";
import { Scrollable } from "~/shared/ui/scrollable";

export function GalleryCarousel(props: { images: string[] }) {
	const images = props.images.length > 0 ? props.images : [null];

	return (
		<Carousel.Root className='w-full'>
			<Carousel.Viewport
				className='w-full h-[18.625rem] lg:h-[27.125rem] overflow-hidden bg-white/[.04]'
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
								width={760} height={434}
								className={cn('w-full h-auto max-h-full', image === null && 'h-full')}
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
	);
}

