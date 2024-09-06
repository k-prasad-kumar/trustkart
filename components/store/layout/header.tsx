import Image from "next/image";
import Logo from "@/assets/trustkart-logo.png";
import { ModeToggle } from "@/components/mode-toggle";
import { ClerkUserButton } from "@/components/clerk-user-button";
import { MobileMenu } from "./mobile-menu";
import { NavMenu } from "./navbar-links";
import Link from "next/link";
import { EllipsisVertical, Heart, ShoppingBag } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { fetchBagByUserId } from "@/lib/actions/user-actions";
import { SearchForm } from "../search";
import { More } from "./more";

export const Header = async () => {
  const user = await currentUser();
  const id: string = user?.id!;
  const role = user?.publicMetadata.role;

  const bag = await fetchBagByUserId(id);
  const bagCount = bag?.length || 0;
  return (
    <header className="w-full h-16 mx-auto px-4 sm:px-6 lg:px-8 flex items-center sticky top-0 bg-background shadow dark:shadow-slate-800 z-50">
      <nav className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3 md:gap-8">
          <div className="md:hidden">
            <MobileMenu role={role as string} />
          </div>
          <Link href={"/"} className="lg:ml-4">
            <Image src={Logo} width={40} height={40} alt="trustkart logo" />
          </Link>
          <div className="hidden md:flex gap-14 z-50">
            <NavMenu />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center">
            <More role={role as string} />
          </div>
          <SearchForm />

          <div className="flex md:hidden items-center">
            <Link href={`/wishlist`}>
              <Heart strokeWidth={1.4} />
            </Link>
          </div>

          <Link href={"/bag"} className="relative">
            <span className="absolute -top-2 -right-2 rounded-full bg-primary text-primary-content text-xs text-center w-4 h-4 text-white">
              {bagCount}
            </span>
            <ShoppingBag strokeWidth={1.4} />
          </Link>

          <ClerkUserButton />

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};
