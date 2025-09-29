import { Hero } from "./Hero";
import { ExploreMarketPlace } from "./ExploreMarketplace";
import { EscrowBuyerSeller } from "./EscrowBuyerSeller";
import { SellaFeautes } from "./SellaFeatures";
import { CreateStore } from "./CreateStore";
/* import { Roadmap } from "./Roadmap"; */

export function Component() {
  return (
    <div className="">
      <Hero />
      <ExploreMarketPlace />
      <EscrowBuyerSeller />
      <SellaFeautes />
      <CreateStore />
      {/*<Roadmap />*/}
    </div>
  );
}
