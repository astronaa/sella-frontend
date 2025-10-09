import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { Link } from "~/shared/ui/nav-link";

export function FooterItems({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex md:flex-row flex-col  md:items-start items-center gap-[2rem]",
        className
      )}
    >
      <Link href="/#explore">Explore</Link>
      <Link href="/#features">Features</Link>
      <Link href="https://sellastore.gitbook.io/whitepaper">Whitepaper</Link>
      {/* <Link href="/#roadmap">Roadmap</Link> */}
    </div>
  );
}
