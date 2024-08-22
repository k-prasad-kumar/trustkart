import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Menu } from "lucide-react";
import Link from "next/link";
import { categoriesList } from "@/lib/data/categories-data";

export const MobileMenu = ({ role }: { role: string }) => {
  const links = categoriesList;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="text-left">
        <SheetHeader>
          <SheetTitle>TrustKart</SheetTitle>
        </SheetHeader>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Men</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="pl-2">
                  <AccordionTrigger>Topwear</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.menTopwear.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=men&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="pl-2">
                  <AccordionTrigger>Bottomwear</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.menBottomwear.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=men&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="pl-2">
                  <AccordionTrigger>Inner & Sleepwear</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.menInnerwear.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=men&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="pl-2 border-b-0">
                  <AccordionTrigger>Footwear</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.menFootwear.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=men&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Women</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="pl-2">
                  <AccordionTrigger>Topwear</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.womenTopwear.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=women&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="pl-2">
                  <AccordionTrigger>Bottomwear</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.womenBottomwear.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=women&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="pl-2">
                  <AccordionTrigger>Inner & Sleepwear</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.womenInnerwear.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=women&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="pl-2 border-b-0">
                  <AccordionTrigger>Footwear</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.womenFootwear.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=women&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Kids</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="pl-2">
                  <AccordionTrigger>Boys Clothing</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.boysClothing.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=kids&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="pl-2">
                  <AccordionTrigger>Girls Clothing</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.girlsClothing.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=kids&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="pl-2 border-b-0">
                  <AccordionTrigger>Footwear</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {links &&
                      links.kidsFootwear.map((link) => (
                        <SheetClose asChild key={link}>
                          <Link
                            href={`/products?category=kids&subCategory=${link}`}
                          >
                            {link}
                          </Link>
                        </SheetClose>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <SheetFooter className="pt-6">
          <div className="flex flex-col justify-center gap-4 py-4">
            {role && role === "admin" && (
              <SheetClose asChild>
                <Link
                  href={"/dashboard"}
                  className="text-base font-medium text-gray-700 dark:text-gray-200"
                >
                  Dashboard
                </Link>
              </SheetClose>
            )}
            <SheetClose asChild>
              <Link
                href={"/orders"}
                className="text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Orders
              </Link>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
