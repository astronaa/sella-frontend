import { Hero } from "./Hero";
import { ExploreMarketPlace } from "./ExploreMarketplace";
import { EscrowBuyerSeller } from "./EscrowBuyerSeller";
import { Disputes } from "./Disputes";
import { SellaFeautes } from "./SellaFeatures";
import { Faq } from "./Faq";
import { CreateStore } from "./CreateStore";
/* import { Roadmap } from "./Roadmap"; */

export function Component() {
  return (
    <div className="">
      <Hero />
      <ExploreMarketPlace />
      <EscrowBuyerSeller />
      <Disputes />
      <SellaFeautes />
      <Faq />
      <CreateStore />
      {/*<Roadmap />*/}
    </div>
  );
}
