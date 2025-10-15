import { PropsWithChildren } from "react";
import { Icons } from "~/shared/ui/icons";

export function FeaturesList() {
  return (
    <div className="flex flex-col gap-[1rem] max-w-[28.75rem]">
      <Feature label="Rocket Start">Launch storefront in 30 seconds</Feature>
      <Feature label="Sell Anything*">
        Digital or Physical, Goods or Services
      </Feature>
      <Feature label="No KYC">Quick and easy</Feature>
      <Feature label="No Subscription">No hidden fees</Feature>
      <Feature label="Robust Escrow">Buyer or seller, we got your back</Feature>
      {/*
			<Feature label="Powered by $SELLA">
				Exclusive benefits & perks
			</Feature>
			*/}
    </div>
  );
}

function Feature({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <div className="flex gap-[0.75rem] items-center min-w-0">
      <Icons.CircleChecked className="text-accent-100 size-[1.25rem] max-md:size-[1.5rem] flex-shrink-0" />
      <p className="md:truncate text-black-60 flex md:gap-1 flex-col md:flex-row">
        <span className="text-white">{label}</span> <span>- {children}</span>
      </p>
    </div>
  );
}
