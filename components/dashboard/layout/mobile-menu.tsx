import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export const MobileMenu = () => {
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Products",
      href: "/dashboard/products",
    },
    {
      name: "Users",
      href: "/dashboard/users",
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
    },
    {
      name: "Reviews",
      href: "/dashboard/reviews",
    },
    {
      name: "Homepage",
      href: "/dashboard/store-home",
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="text-left">
        <SheetHeader>
          <SheetTitle>Admin Dashboard</SheetTitle>
        </SheetHeader>
        <SheetFooter className="pt-6">
          <div className="flex flex-col justify-center gap-4 py-4">
            {links.map((link) => (
              <SheetClose asChild key={link.name}>
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-gray-700 dark:text-gray-200"
                >
                  {link.name}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
