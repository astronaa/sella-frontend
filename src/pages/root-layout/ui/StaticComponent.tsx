import { PropsWithChildren } from "react";
import Link from "next/link";
import { Footer } from "~/widgets/footer";
import { AppLogo } from "~/shared/ui/logo";

export function StaticRootLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full min-h-full">
      <header className="sticky top-[1rem] z-header w-[calc(100%-2rem)] max-w-content mx-auto">
        <nav className="flex items-center justify-between gap-[1rem] rounded-[1.25rem] border border-secondary bg-black-08/[.80] px-[1rem] py-[0.875rem] backdrop-blur-[3rem]">
          <Link href="/" className="flex items-center">
            <AppLogo className="h-[2rem] w-auto" />
          </Link>

          <div className="flex items-center gap-[1rem] text-sm text-black-60">
            <Link className="transition hover:text-white" href="/marketplace">
              Marketplace
            </Link>
            <Link className="transition hover:text-white" href="/products/search">
              Products
            </Link>
          </div>
        </nav>
      </header>

      <div className="w-full min-h-full pt-[8rem]">{children}</div>

      <Footer />
    </div>
  );
}
