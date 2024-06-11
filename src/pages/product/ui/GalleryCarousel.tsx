import { PreviewImage } from "~/shared/ui/image";
import { Carousel } from "~/shared/ui/kit";

export function GalleryCarousel({ images }: { images: string[] }) {
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
								className='w-full h-auto max-h-full'
							/>
						</Carousel.Item>
					))}
				</Carousel.ItemGroup>
			</Carousel.Viewport>
			<Carousel.Control>
				<Carousel.IndicatorGroup>
					{images.map((image, index) => (
						<Carousel.Indicator
							key={index} index={index}
							aria-label={`Goto slide ${index + 1}`}
							className='rounded-[1rem] w-full'
						>
							<PreviewImage
								src={image}
								alt={`Indicator ${index}`}
								width={146} height={80}
								className='size-full'
							/>
						</Carousel.Indicator>
					))}
				</Carousel.IndicatorGroup>
			</Carousel.Control>
		</Carousel.Root>
	);
}