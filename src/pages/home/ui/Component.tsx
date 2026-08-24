import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { ExploreMarketPlace } from "./ExploreMarketplace";
import { EscrowBuyerSeller } from "./EscrowBuyerSeller";
import { Disputes } from "./Disputes";
import { Borderless } from "./Borderless";
import { SellaFeautes } from "./SellaFeatures";
import { Faq } from "./Faq";
import { CreateStore } from "./CreateStore";
import { Roadmap } from "./Roadmap";

export function Component() {
  return (
    <div className="">
      {/* film grain unifies every surface on the page */}
      <div className="lp-grain" aria-hidden />
      <Hero />
      <HowItWorks />
      <ExploreMarketPlace />
      <EscrowBuyerSeller />
      <Disputes />
      <Borderless />
      <SellaFeautes />
      <Roadmap />
      <Faq />
      <CreateStore />
    </div>
  );
}
