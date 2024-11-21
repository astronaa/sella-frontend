import Logo from '../assets/logo.svg'
import Image from "next/image";
import ImgSrc from "../assets/coming-soon.png";
import { GradientBackground } from '~/shared/ui/gradient-background';

export function Component() {
	return (
		<div className="flex flex-col items-center min-h-screen relative text-center font-tt">

			<Logo className="mt-6 mb-24"/>

			<div>
				<p
					style={{
						fontWeight: 600,
						letterSpacing: '3px',
					}}
					className='text-xl max-md:text-sm uppercase text-black-74 text-center'
				>the marketplace of tomorrow</p>

				<p
					className="text-9xl max-md:text-7xl leading-normal"
					style={{
						fontWeight: 600,
						textAlign: 'center',
						background: 'linear-gradient(180deg, #EC9515 0%, #FFDD00 100%)',
						backgroundClip: 'text',
						color: 'transparent'
					}}
				>Coming Soon</p>
			</div>


			<div className="w-full overflow-hidden flex justify-center items-center">
				<Image className='rotate-[-15deg] max-md:scale-125 max-md:mt-[4rem]' src={ImgSrc} alt="coming soon" width={960} height={960}/>
			</div>

			<GradientBackground className='z-[-1]' />
		</div>
	)
}
