import Logo from '../assets/logo.svg'
import Image from "next/image";
import ImgSrc from "../assets/coming-soon.png";

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
				<Image className='-rotate-15 max-md:scale-125 max-md:mt-[4rem]' src={ImgSrc} alt="coming soon" width={960} height={960}/>
			</div>

			<div className='md:hidden' style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				inset: 0,
				opacity: 0.5,
				zIndex: -1,
				background: `
				radial-gradient(124.11% 78.67% at 100% 100%, #FEC805 0%, rgba(223, 39, 39, 0) 100%),
				radial-gradient(41.63% 69.69% at 0% 100%, #353535 0%, #0F0F0F 100%)
				`,
			}}/>

			<div className='max-md:hidden' style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				inset: 0,
				opacity: 0.5,
				zIndex: -1,
				background: `radial-gradient(50% 79.78% at 100% 100%, #FEC805 0%, rgba(223, 39, 39, 0) 100%),
				radial-gradient(41.63% 69.69% at 0% 100%, #353535 0%, #0F0F0F 100%)
				`,
			}}/>
		</div>
	)
}
