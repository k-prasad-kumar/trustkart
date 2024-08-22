"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { fetchProductBySlug } from "@/lib/actions/product-actions";
import { addToBag, deleteWishlist } from "@/lib/actions/user-actions";
import { BagInterface, WishlistDBInterface } from "@/lib/types";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const MoveWishlist = ({ item }: { item: WishlistDBInterface }) => {
  const [selectedSize, setSelectedSize] = useState({ size: "", stock: 0 });
  const [sizes, setSizes] = useState<{ size: string; stock: number }[]>();
  const [isPending, startTransistion] = useTransition();

  const getSizes = () => {
    fetchProductBySlug(item.slug)
      .then((data) => {
        setSizes(data?.sizes);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSize = (size: { size: string; stock: number }) => {
    setSelectedSize(size);
  };

  const moveToBag = (item: WishlistDBInterface) => {
    if (selectedSize.size === "") {
      toast.error("Please select a size");
      return;
    }

    startTransistion(() => {
      const bagItem: BagInterface = {
        name: item?.name,
        slug: item?.slug,
        brand: item?.brand,
        color: item?.color,
        size: selectedSize.size,
        quantity: 1,
        sellingPrice: item?.sellingPrice,
        retailPrice: item?.retailPrice,
        discount: item?.discount,
        image: item?.image,
        productId: item?.id,
        userId: item.userId,
      };
      addToBag(bagItem)
        .then((data) => {
          if (data?.error) {
            toast.error(data?.error);
          } else {
            deleteWishlist(item.id)
              .then(() => {
                if (data?.error) {
                  toast.error(data?.error);
                } else {
                  toast.success("Product moved to bag");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => getSizes()}>
        <div className="cursor-pointer">MOVE TO BAG</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex gap-4 items-center">
            <Image
              src={item.image}
              width={100}
              height={100}
              alt="Wishlist"
              sizes="100%"
            />

            <div className="h-full text-left">
              <DialogTitle className="text-sm">{item.brand}</DialogTitle>
              <DialogDescription>{item.name}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Separator />

        <h2>SELECT SIZE</h2>

        <div className={`flex items-center flex-wrap gap-4`}>
          {sizes &&
            sizes?.map((size, index) => (
              <div
                key={index}
                className={`relative min-w-14 min-h-14 border border-gray-300 dark:border-gray-700 rounded-full flex justify-center items-center cursor-pointer font-semibold ${
                  size.stock <= 0
                    ? "text-gray-300 dark:text-gray-700 cursor-default hover:border-gray-300"
                    : "hover:border-primary hover:dark:border-primary"
                }${
                  selectedSize.size === size.size
                    ? "boreder border-primary dark:border-primary text-primary"
                    : ""
                }`}
                onClick={() => handleSize(size)}
              >
                <>
                  {size.size}
                  <span
                    className={`absolute top-[50%] left-0 right-0 w-full h-[1px] bg-gray-300 dark:bg-gray-700 rotate-[145deg] ${
                      size.stock === 0 ? "block" : "hidden"
                    }`}
                  ></span>
                </>
              </div>
            ))}
        </div>

        <DialogFooter className="flex items-center flex-row justify-end">
          <Button
            className="w-full"
            onClick={() => moveToBag(item)}
            disabled={isPending}
          >
            MOVE TO WISHLIST
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
