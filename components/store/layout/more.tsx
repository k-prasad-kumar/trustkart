import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  Heart,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";

export const More = ({ role }: { role: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical strokeWidth={1.4} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {role && role === "admin" && (
          <DropdownMenuItem asChild>
            <Link
              href={"/dashboard"}
              className="pl-1 flex items-center gap-2 cursor-pointer"
            >
              <LayoutDashboard size={14} strokeWidth={1.5} /> Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link
            href={"/wishlist"}
            className="pl-1 flex items-center gap-2 cursor-pointer"
          >
            <Heart size={14} strokeWidth={1.5} /> Wishlist
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={"/orders"}
            className="pl-1 flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBasket size={14} strokeWidth={1.5} /> Orders
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
