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
import { addToWishlist, deleteBagItem } from "@/lib/actions/user-actions";
import { BagDBInterface, WishlistInterface } from "@/lib/types";
import { X } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteBag = ({ item }: { item: BagDBInterface }) => {
  const [isPending, startTransistion] = useTransition();
  const handleDelete = (id: string) => {
    startTransistion(() => {
      deleteBagItem(id)
        .then((data) => {
          if (data?.error) {
            toast.error(data?.error);
          } else {
            toast.success(data?.success);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleWishlist = () => {
    const wishlist: WishlistInterface = {
      name: item?.name,
      slug: item?.slug,
      brand: item?.brand,
      color: item?.color,
      sellingPrice: item?.sellingPrice,
      retailPrice: item?.retailPrice,
      discount: item?.discount,
      image: item?.image,
      productId: item?.productId,
      userId: item.userId,
    };
    startTransistion(() => {
      addToWishlist(wishlist)
        .then((data) => {
          if (data?.error) {
            toast.error(data?.error);
          } else {
            deleteBagItem(item.id)
              .then((data) => {
                if (data?.error) {
                  toast.error(data?.error);
                } else {
                  toast.success("Product moved to wishlist");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <X size={24} color="grey" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex gap-4 items-center">
              <Image
                src={item.image}
                width={100}
                height={100}
                alt="product"
                sizes="100%"
              />

              <div className="h-full text-left">
                <DialogTitle className="text-sm">Move from Bag</DialogTitle>
                <DialogDescription>
                  Are you sure you want to move this item from bag?
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <Separator />
          <DialogFooter className="flex items-center flex-row justify-end">
            <Button
              variant={"ghost"}
              className="text-destructive"
              onClick={() => handleDelete(item.id)}
              disabled={isPending}
            >
              REMOVE
            </Button>
            <Button
              variant={"ghost"}
              className="text-primary"
              onClick={() => handleWishlist()}
              disabled={isPending}
            >
              MOVE TO WISHLIST
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
