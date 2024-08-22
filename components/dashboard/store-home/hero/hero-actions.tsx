import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis, Pen, Trash } from "lucide-react";
import Link from "next/link";

export const HeroAction = ({ id }: { id: string }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon" className="hover:border">
            <Ellipsis
              strokeWidth={1.5}
              className="mx-auto text-slate-500 cursor-pointer"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/dashboard/store-home/hero/update/${id}`}>
            <DropdownMenuItem className="cursor-pointer space-x-2">
              <Pen size={14} /> <span>Edit</span>
            </DropdownMenuItem>
          </Link>
          {/* dialog for delete product */}
          <Link href={`/dashboard/store-home/hero/delete/${id}`}>
            <DropdownMenuItem className="cursor-pointer space-x-2">
              <Trash size={14} />
              <span>Delete</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
