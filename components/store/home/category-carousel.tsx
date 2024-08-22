import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShopByInterface } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export const CategoryCarousel = ({
  shopBy,
}: {
  shopBy: ShopByInterface[] | null;
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full my-4 max-w-full relative"
    >
      <CarouselContent>
        {shopBy &&
          shopBy.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <Link href={item.href} className="p-1">
                <div className="flex flex-col aspect-square items-center justify-center p-1 border shadow">
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    sizes="100%"
                    loading="lazy"
                    alt={"Category image"}
                    className="w-full h-auto"
                  />
                  <p className="text-center font-semibold my-1 truncate w-full px-1">
                    T-Shirts
                  </p>
                  <p className="text-center text-xs text-orange-400">
                    UP TO {item.discount}% OFF
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="absolute bottom-[50%] left-3" />
      <CarouselNext className="absolute bottom-[50%] right-3" />
    </Carousel>
  );
};
