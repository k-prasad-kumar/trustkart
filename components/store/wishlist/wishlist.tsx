"use client";

import { Button } from "@/components/ui/button";

import { deleteWishlist } from "@/lib/actions/user-actions";
import Image from "next/image";
import Link from "next/link";
import emptyWishlist from "@/assets/empty-wishlist.svg";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { toast } from "sonner";
import { WishlistDBInterface } from "@/lib/types";
import { MoveWishlist } from "./move-wishlist";

export const Wishlist = ({
  wishlist,
}: {
  wishlist: WishlistDBInterface[] | null;
}) => {
  const handleWishlist = (id: string) => {
    deleteWishlist(id)
      .then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success("Product removed from wishlist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {wishlist && wishlist.length <= 0 ? (
        <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full sm:w-1/2 lg:w-1/3 gap-4">
            <Image
              src={emptyWishlist}
              width={100}
              height={100}
              sizes="100%"
              loading="lazy"
              alt={"empty wishlist"}
              className="h-auto"
            />
            <h2 className="font-semibold text-lg">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-sm text-center">
              Add items that you like to your wishlist. Review them anytime and
              easily move them to the bag.
            </p>
            <Button asChild className="my-4">
              <Link href={"/"}>CONTINUE SHOPPING</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full my-4">
          <h1 className="font-medium mb-8">
            My Wishlist{" "}
            <span className="text-slate-500">{wishlist?.length} items </span>
          </h1>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {wishlist &&
              wishlist.map((item, index) => (
                <div
                  key={item.id}
                  className="w-full flex flex-col justify-center border relative"
                >
                  <Link href={`/products/${item.slug}`}>
                    <Image
                      src={item.image}
                      width={100}
                      height={100}
                      sizes="100%"
                      loading="lazy"
                      alt={item.name}
                      className="w-full h-auto"
                    />

                    <div className="p-2 text-center space-y-2">
                      <p className="truncate text-sm">{item.name}</p>
                      <p className="px-4 pb-3 space-x-1 truncate text-sm">
                        <span className="font-semibold">
                          Rs.{item.sellingPrice}
                        </span>
                        <span className="line-through text-slate-500 text-[.8rem] lg:text-xs">
                          Rs. {item.retailPrice}
                        </span>{" "}
                        <span className="text-[#ff905a] text-[.8rem] md:text-[.8rem] lg:text-xs font-semibold">
                          ({item.discount}% OFF)
                        </span>
                      </p>
                    </div>
                  </Link>
                  <Separator />
                  <div className="text-xs font-semibold text-primary w-full text-center p-4">
                    <MoveWishlist item={item} />
                  </div>

                  <div
                    className="absolute top-1 right-1 w-fit border p-1 rounded-full bg-gray-200 cursor-pointer"
                    onClick={() => handleWishlist(item.id)}
                  >
                    <X size={18} strokeWidth={1.4} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
