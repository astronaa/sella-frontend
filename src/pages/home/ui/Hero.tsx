import { FeaturesList } from "./Features";
import { GradientBackground } from "~/shared/ui/gradient-background";
import { VideoAnimationPlayer } from "~/shared/ui/video-anim-player";
import { Heading } from "~/shared/ui/kit/heading";
import { StorefrontOpenControls } from "~/widgets/storefront-open";

export function Hero() {
  return (
    <div
      className="flex flex-col rounded relative overflow-hidden px-[1rem] bg-black rounded-b-[3rem]
				max-md:top-[-12.5rem] max-md:pt-[10.25rem] max-md:mb-[-10rem]"
    >
      <GradientBackground />

      <div className="flex flex-grow items-end justify-between gap-[1rem] relative w-full max-w-content m-auto max-lg:justify-center">
        <div className="flex flex-col gap-[3rem] max-w-[35rem] w-full pb-[7.25rem] flex-shrink-0">
          <Heading size="xl">Open your web3 storefront in seconds</Heading>

          <FeaturesList />
          <StorefrontOpenControls />
        </div>

        <VideoAnimationPlayer
					className='flex-shrink-0 w-[30rem] xl:w-[48rem] hidden lg:block h-[48rem]'
					src='/videos/hero-anim2.webm'
					srcHevc='/videos/hero-anim2.mov'
				/>
      </div>
    </div>
  );
}
