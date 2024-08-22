"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroInterface } from "@/lib/types";

export const HomeCarousel = ({ hero }: { hero: HeroInterface[] | null }) => {
  return (
    <div className="relative w-full h-full max-w-full">
      <Carousel>
        <CarouselContent>
          {hero &&
            hero.map((item) => (
              <CarouselItem key={item.id}>
                <div className="w-full flex flex-col md:flex-row my-1 md:my-4">
                  <div className="flex aspect-square items-center justify-center w-full md:w-1/3">
                    <Image
                      src={item.image}
                      width={100}
                      height={100}
                      sizes="100%"
                      loading="lazy"
                      alt={"banner image"}
                      className="w-full h-auto p-0"
                    />
                  </div>
                  <div className="flex flex-col justify-center w-full md:w-2/3 gap-2 border border-t-transparent md:border-l-transparent md:border-t-primary border-primary px-4 md:pl-8 lg:pl-14">
                    <h1 className="font-bold text-2xl md:text-4xl tracking-wider text-primary dark:text-white my-2 md:my-4">
                      {item.brand}
                    </h1>
                    <h2 className="font-semibold text-lg">{item.headline}</h2>
                    <p className="text-sm">{item.subHeadline}</p>
                    <Link
                      href={item.href}
                      className="text-primary dark:text-white uppercase my-4 md:my-6 border hover:border-primary w-fit py-2 px-4 flex gap-2 font-semibold"
                    >
                      {item.link} <ArrowRight />
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute bottom-[50%] left-3" />
        <CarouselNext className="absolute bottom-[50%] right-3" />
      </Carousel>
    </div>
  );
};
