"use client";

import { useMobileMenuStrictContext } from "./context";
import { cn } from "~/shared/lib/cn";
import { UserNavBar } from "../user-nav-bar";
import { Link } from "~/shared/ui/nav-link";

export function PhoneNavbarContent() {
  const { open, setOpen } = useMobileMenuStrictContext();
  if (!open) return null;

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div
      className={cn(
        "backdrop-blur-[3rem] bg-black-06/50 flex flex-col p-4 justify-between h-screen pt-[8rem] pb-[2.875rem] w-full",
        "fixed top-0 z-mobile-menu h-screen",
        "lg:hidden"
      )}
    >
      <div
        className={cn(
          "items-start gap-[2rem] flex flex-col md:flex",
          "text-[2.5rem] gap-[2.25rem] pl-[1.25rem] font-semibold leading-[1]"
        )}
      >
        <NavItem onClick={handleLinkClick} href="/">
          Home
        </NavItem>
        <NavItem onClick={handleLinkClick} href="/marketplace">
          Explore
        </NavItem>
        <NavItem onClick={handleLinkClick} href="/#features">
          Features
        </NavItem>
        <NavItem onClick={handleLinkClick} href="/#whitepaper">
          Whitepaper
        </NavItem>
        <NavItem onClick={handleLinkClick} href="/#roadmap">
          Roadmap
        </NavItem>
      </div>

      <UserNavBar className="flex-col-reverse [&_button]:w-full" />
    </div>
  );
}

interface NavItemProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}

function NavItem({ href, onClick, children }: NavItemProps) {
  return (
    <Link onClick={onClick} href={href}>
      {children}
    </Link>
  );
}
