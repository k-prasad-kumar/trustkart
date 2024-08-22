import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function ProductCarousel({
  images,
}: {
  images: { url: string; public_id: string }[] | undefined;
}) {
  return (
    <div className="relative w-full h-full max-w-full">
      <Carousel>
        <CarouselContent>
          {images &&
            images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="flex aspect-square items-center justify-center">
                  <Image
                    src={image.url}
                    width={100}
                    height={100}
                    sizes="100%"
                    loading="lazy"
                    alt={"product image"}
                    className="p-2 w-full h-auto"
                  />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute bottom-[50%] left-3" />
        <CarouselNext className="absolute bottom-[50%] right-3" />
      </Carousel>
    </div>
  );
}
