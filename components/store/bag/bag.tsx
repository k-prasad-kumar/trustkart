"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BagDBInterface } from "@/lib/types";
import { Bookmark, ChevronRight, Heart, IndianRupee } from "lucide-react";
import Image from "next/image";
import { DeleteBag } from "./delete-bag";
import Link from "next/link";
import emptyCart from "@/assets/empty-cart.svg";
import { ChangeQuantity } from "./change-quantity";
import { loadStripe } from "@stripe/stripe-js";
import { stripeCheckout } from "@/components/store/stripe-checkout";
import { toast } from "sonner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const Bag = ({
  bag,
  name,
}: {
  bag: BagDBInterface[] | null;
  name: string;
}) => {
  const retailPriceTotal = bag?.reduce(
    (acc, item) => acc + item.retailPrice,
    0
  );
  const sellingPriceTotal = bag?.reduce(
    (acc, item) => acc + item.sellingPrice,
    0
  );

  const discount = retailPriceTotal! - sellingPriceTotal! || 0;

  const placeOrder = async () => {
    try {
      const stripe = await stripePromise;

      const res = await stripeCheckout(bag, name);

      if (res?.error) {
        toast.error(res?.error);
      }

      const data = res?.success;

      await stripe?.redirectToCheckout({
        sessionId: data?.id!,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {bag && bag.length <= 0 ? (
        <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full sm:w-1/2 gap-4">
            <div className="w-full sm:w-1/2 flex items-center justify-center">
              <Image
                src={emptyCart}
                width={100}
                height={100}
                alt="no product"
                sizes="100%"
                className="w-1/2 h-auto"
              />
            </div>
            <h2 className="font-semibold text-lg">YOUR BAG IS EMPTY</h2>
            <p className="text-sm text-center">
              There is nothing in your bag. Add items from your wishlist.
            </p>
            <Button asChild className="my-4">
              <Link href={"/wishlist"}>ADD ITEMS FROM WISHLIST</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="lg:px-14 mt-4">My Bag {bag?.length} items</h1>
          <div className="w-full flex flex-col md:flex-row gap-8 md:gap-4 my-4 lg:px-14">
            <div className="w-full md:w-4/6 lg:w-3/5 space-y-4">
              {bag &&
                bag?.map((item) => (
                  <div className="w-full flex sm:flex-row border" key={item.id}>
                    <div className="w-2/6 sm:w-1/5">
                      <Image
                        src={item.image}
                        width={100}
                        height={100}
                        sizes="100%"
                        loading="lazy"
                        alt={"product image"}
                        className="p-2 w-full h-auto"
                      />
                    </div>
                    <div className="w-4/6 sm:w-4/5 flex flex-col px-2 py-3 relative">
                      <h2 className="font-semibold truncate">{item.brand}</h2>
                      <p className="text-sm truncate">{item.name}</p>
                      <p className="text-sm space-x-1 truncate py-2">
                        <span className="font-semibold">
                          Rs.{item.sellingPrice}
                        </span>
                        <span className="line-through text-slate-500 text-[.8rem] lg:text-xs">
                          Rs. {item.retailPrice}
                        </span>{" "}
                        <span className="text-[#ff905a]">
                          {item.discount}% OFF
                        </span>
                      </p>

                      <div className="flex gap-2 my-1 items-center">
                        <p className="text-sm">Size : {item.size}</p>
                      </div>
                      <ChangeQuantity
                        id={item.id}
                        slug={item.slug}
                        itemSize={item.size}
                        quantity={item.quantity}
                      />

                      <div className="absolute top-2 right-2 cursor-pointer">
                        <DeleteBag item={item} />
                      </div>
                    </div>
                  </div>
                ))}
              <div className="w-full border p-4 flex justify-between items-center">
                <Link
                  href={"/wishlist"}
                  className="hover:underline flex gap-2 items-center"
                >
                  <Bookmark size={18} />
                  Add More From Wishlist
                </Link>
                <ChevronRight size={18} />
              </div>
            </div>
            <div className="w-full md:w-2/6 lg:w-2/5 h-fit border">
              <div className="p-4">
                <h1 className="text-sm font-semibold">
                  PRICE DETAILS ({bag?.length} items)
                </h1>
                <div className="flex justify-between mt-4">
                  <p className="text-sm">Total MRP</p>
                  <p className="flex items-center text-sm">
                    <IndianRupee size={14} /> {retailPriceTotal}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-sm">Discount on MRP</p>
                  <p className="flex items-center text-[#03a685] text-sm">
                    -
                    <IndianRupee size={14} />
                    {discount}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-sm">Shipping Fee</p>
                  <p className="flex items-center text-[#03a685] text-sm">
                    FREE
                  </p>
                </div>
                <p className="text-xs mb-4">Free shipping for you</p>
                <Separator />
                <div className="flex justify-between my-4">
                  <p className="font-medium">Total Amount</p>
                  <p className="flex items-center">
                    <IndianRupee size={14} />
                    {sellingPriceTotal}
                  </p>
                </div>

                <Button className="w-full mt-4" onClick={() => placeOrder()}>
                  {" "}
                  PLACE ORDER
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
