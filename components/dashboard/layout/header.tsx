import Image from "next/image";
import Logo from "@/assets/trustkart-logo.png";
import { ModeToggle } from "@/components/mode-toggle";
import { ClerkUserButton } from "@/components/clerk-user-button";
import { DashboardLinks } from "./dashboard-links";
import { MobileMenu } from "./mobile-menu";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full h-16 mx-auto px-4 sm:px-6 lg:px-8 flex items-center sticky top-0 bg-background shadow dark:shadow-slate-800 z-50">
      <nav className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <div className="md:hidden">
            <MobileMenu />
          </div>
          <Link href={"/"}>
            <Image src={Logo} width={40} height={40} alt="trustkart logo" />
          </Link>
          <div className="hidden md:flex gap-8">
            <DashboardLinks />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ClerkUserButton />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};
