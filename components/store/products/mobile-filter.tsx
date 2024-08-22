"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const MobileFilter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="w-full">FILTERS</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>FILTERS</SheetTitle>
          </SheetHeader>
          <SheetFooter>{children}</SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
