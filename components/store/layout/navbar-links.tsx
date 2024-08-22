"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categoriesList } from "@/lib/data/categories-data";

export const NavMenu = () => {
  const links = categoriesList;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* men menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>MEN</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex gap-4 p-6">
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium">Topwear</h1>
                <div className="flex flex-col">
                  {links &&
                    links.menTopwear.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=men&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium">Bottomwear</h1>
                <div className="flex flex-col">
                  {links &&
                    links.menBottomwear.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=men&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium truncate">
                  Inner & Sleepwear
                </h1>
                <div className="flex flex-col">
                  {links &&
                    links.menInnerwear.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=men&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium">Footwear</h1>
                <div className="flex flex-col">
                  {links &&
                    links.menFootwear.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=men&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* women menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>WOMEN</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex gap-4 p-6">
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium">Topwear</h1>
                <div className="flex flex-col">
                  {links &&
                    links.womenTopwear.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=women&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium">Bottomwear</h1>
                <div className="flex flex-col">
                  {links &&
                    links.womenBottomwear.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=women&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium truncate">
                  Inner & Sleepwear
                </h1>
                <div className="flex flex-col">
                  {links &&
                    links.womenInnerwear.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=women&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium">Footwear</h1>
                <div className="flex flex-col">
                  {links &&
                    links.womenFootwear.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=women&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* kids menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>KIDS</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex gap-8 p-6">
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium truncate">
                  Boys Clothing
                </h1>
                <div className="flex flex-col">
                  {links &&
                    links.boysClothing.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=kids&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium truncate">
                  Girls Clothing
                </h1>
                <div className="flex flex-col">
                  {links &&
                    links.girlsClothing.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=kids&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-fit px-4">
                <h1 className="text-primary font-medium truncate">Footwear</h1>
                <div className="flex flex-col">
                  {links &&
                    links.kidsFootwear.map((link) => (
                      <NavigationMenuLink key={link}>
                        <Link
                          href={`/products?category=kids&subCategory=${link}`}
                          className="truncate text-sm font-light tracking-wider hover:text-primary"
                        >
                          {link}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
