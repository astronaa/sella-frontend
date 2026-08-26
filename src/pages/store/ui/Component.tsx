import { Suspense } from "react";
import { fetchStore, fetchStoreReviews } from "../api";
import { ProductsStream } from "./products-stream/Component";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { Heading } from "./Heading";
import { StoreReviews } from "./StoreReviews";
import { StoreOnPageProvider } from "./StoreOnPageProvider";
import { EditMode } from "./edit-mode";

export async function Component({ storeUrl }: { storeUrl: string }) {
  const store = await fetchStore(storeUrl);
  const reviews = await fetchStoreReviews(storeUrl);

  return (
    <StoreOnPageProvider initialData={store}>
      <div className="flex flex-col w-full max-w-content mx-auto max-xl:px-4">
        <EditMode.Root>
          <Heading />
          {/* Suspense: the products grid reads search params (filters, pagination),
              which the static export needs wrapped in a boundary. */}
          <Suspense fallback={<div className="min-h-[30rem] mb-[6rem] max-md:mb-[5rem]" />}>
            <ProductsStream className="mb-[6rem] max-md:mb-[5rem]" />
          </Suspense>
        </EditMode.Root>

        <StoreReviews
          className="mb-[6rem] max-md:mb-[5rem]"
          reviews={reviews.items}
          total={reviews.total}
        />

        {/* <SimilarStoreFronts
					className='mb-[6rem] max-md:mb-[3rem]'
					storeUrl={storeUrl}
				/> */}

        <StorefrontOpenBanner />
      </div>
    </StoreOnPageProvider>
  );
}
