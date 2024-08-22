import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductDBInterface, ShopByInterface } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export const NewArrivals = ({
  shopBy,
}: {
  shopBy: ProductDBInterface[] | null;
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
              <Link href={`/products/${item.slug}`} className="p-1">
                <div className="flex flex-col aspect-square items-center justify-center p-1 border shadow relative">
                  <Image
                    src={item.images[0].url}
                    width={100}
                    height={100}
                    sizes="100%"
                    loading="lazy"
                    alt={"Category image"}
                    className="w-full h-auto"
                  />
                  <p className="text-center font-semibold my-1 truncate w-full px-1">
                    {item.brand}
                  </p>
                  {/* <p className="text-center text-sm">Shop Now</p> */}
                  {/* <p className="text-center text-sm absolute top-1 right-1 text-white bg-primary">
                    ₹{item.discount}
                  </p> */}
                  <p className="text-xs text-emerald-500 tracking-wider">
                    ₹ {item.discount}.00
                  </p>
                  <p className="absolute top-1 left-0 text-white bg-primary text-[10px] pr-2 pl-1">
                    NEW
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
