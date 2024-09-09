"use client";

import { useState, useTransition } from "react";
import {
  BagInterface,
  ProductInterface,
  ReviewDBInterface,
  WishlistInterface,
} from "@/lib/types";
import { ProductCarousel } from "./product-carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, ShoppingBag, Star, StarIcon } from "lucide-react";
import { addToBag, addToWishlist } from "@/lib/actions/user-actions";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import noProduct from "@/assets/no-product.svg";
import { Reviews } from "../review/reviews";

export const ProductDetails = ({
  product,
  relatedProducts,
  id,
  bag,
  wishlist,
  reviews,
  rating,
  reviewCount,
}: {
  product: ProductInterface | null;
  relatedProducts: ProductInterface[] | null;
  id: string;
  bag: boolean;
  wishlist: boolean;
  reviews: ReviewDBInterface[] | undefined;
  rating: string;
  reviewCount: number;
}) => {
  const [selectedSize, setSelectedSize] = useState({ size: "", stock: 0 });
  const [addedBag, setAddedBag] = useState<boolean>(bag);
  const [addedWishlist, setAddedWishlist] = useState<boolean>(wishlist);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransistion] = useTransition();

  const handleSize = (value: { size: string; stock: number }) => {
    if (value.stock === 0) return null;
    setSelectedSize(value);
    setError(undefined);
  };

  const handleBag = () => {
    if (!id) {
      toast.error("Please login to add products to Bag");
      return;
    }
    if (selectedSize.size === "" || selectedSize.stock === 0) {
      setError("Please select a size");
      toast.error("Please select a size");
      return;
    }

    const bagItem: BagInterface = {
      name: product?.name!,
      slug: product?.slug!,
      brand: product?.brand!,
      color: product?.color!,
      size: selectedSize.size,
      quantity: 1,
      sellingPrice: product?.sellingPrice!,
      retailPrice: product?.retailPrice!,
      discount: product?.discount!,
      image: product?.images[0].url!,
      productId: product?.id!,
      userId: id,
    };
    startTransistion(() => {
      addToBag(bagItem)
        .then((data: any) => {
          if (data?.error) {
            toast.error(data?.error);
          } else {
            toast.success(data?.success);
            setAddedBag(true);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
  };

  const handleWishlist = () => {
    if (!id) {
      toast.error("Please login to add products to wishlist");
      return;
    }

    const wishlist: WishlistInterface = {
      name: product?.name!,
      slug: product?.slug!,
      brand: product?.brand!,
      color: product?.color!,
      sellingPrice: product?.sellingPrice!,
      retailPrice: product?.retailPrice!,
      discount: product?.discount!,
      image: product?.images[0].url!,
      productId: product?.id!,
      userId: id,
    };
    startTransistion(() => {
      addToWishlist(wishlist)
        .then((data: any) => {
          if (data?.error) {
            toast.error(data?.error);
          } else {
            toast.success(data?.success);
            setAddedWishlist(true);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
  };

  return (
    <>
      {!product && (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
          <div className="w-full sm:w-1/2 flex items-center justify-center">
            <Image
              src={noProduct}
              width={100}
              height={100}
              alt="no product"
              sizes="100%"
              className="w-1/2 h-auto"
            />
          </div>

          <h1 className="tracking-wide">No Product Found</h1>

          <Button asChild className="my-4">
            <Link href={"/"}>CONTINUE SHOPPING</Link>
          </Button>
        </div>
      )}
      {product && (
        <div className="w-full">
          <div className="w-full flex flex-col md:flex-row my-4 gap-4">
            <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center">
              <ProductCarousel images={product?.images} />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3 px-1 md:px-4 py-4">
              <h1 className="text-xl font-semibold">
                {product && product.brand}
              </h1>
              <p className="text-lg dark:text-gray-300 text-gray-500">
                {product && product.name}
              </p>

              <Reviews
                rating={rating}
                reviewCount={reviewCount}
                reviews={reviews}
                userId={id}
                slug={product?.slug!}
              />
              <Separator />

              <div className="flex items-center mt-6 gap-4">
                <h2 className="flex items-center font-semibold text-xl gap-1">
                  &#8377;
                  <span>{product && product.sellingPrice}</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-300 flex items-center gap-1 text-sm">
                  MRP
                  <span className="line-through flex items-center">
                    &#8377;{product && product.retailPrice}
                  </span>
                </p>
                <p className="text-[#ff905a] font-medium">
                  ({product?.discount}% OFF)
                </p>
              </div>
              <p className="text-[#03a685] text-sm font-semibold mt-1">
                inclusive of all taxes
              </p>

              <div className="text-sm my-8 space-y-4">
                <p className="font-semibold">SELECT SIZE</p>
                {error && <p className="text-destructive">{error}</p>}
                <div className={`flex items-center flex-wrap gap-4`}>
                  {product?.sizes.map((size, index) => (
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
              </div>

              <div className="p-0 space-y-4 mt-14">
                <p className="text-sm font-semibold">PRODUCT DETAILS</p>
                <p className="text-sm">{product && product.productDetails}</p>
              </div>
              <div className="w-full h-14 flex justify-between sm:justify-start gap-4 mt-14">
                {addedBag && addedBag ? (
                  <Button
                    className="p-4 w-full sm:w-fit h-14 space-x-2 text-sm md:text-base flex items-center"
                    disabled={isPending}
                    asChild
                  >
                    <Link href="/bag" className="w-full sm:w-fit">
                      <span>GO TO BAG</span>
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="p-4 w-full sm:w-fit h-14 space-x-2 text-sm md:text-base flex items-center"
                    disabled={isPending}
                    onClick={handleBag}
                  >
                    <ShoppingBag size={18} /> <span>ADD TO BAG</span>
                  </Button>
                )}

                {addedWishlist && addedWishlist ? (
                  <Button
                    className="p-4 w-full sm:w-fit h-14 space-x-2 text-sm md:text-base flex items-center cursor-not-allowed"
                    variant={"outline"}
                  >
                    <Heart size={18} fill="#ff3f6c" strokeWidth={0} />{" "}
                    <span>WISHLISTED</span>
                  </Button>
                ) : (
                  <Button
                    className="p-4 w-full sm:w-fit h-14 space-x-2 text-sm md:text-base flex items-center border"
                    variant={"outline"}
                    onClick={handleWishlist}
                    disabled={isPending}
                  >
                    <Heart size={18} /> <span>WISHLIST</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Separator />
          <div className="w-full my-8">
            <h1 className="my-8 tracking-widest text-xl font-bold">
              SIMILAR PRODUCTS
            </h1>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-4 mb-14">
              {relatedProducts &&
                relatedProducts?.map((product: any) => (
                  <Link
                    href={`/products/${product.slug}`}
                    key={product.id}
                    className="w-full h-fit hover:shadow-md hover:border cursor-pointer"
                  >
                    <Image
                      src={product.images[0].url}
                      width={100}
                      height={100}
                      sizes="100%"
                      loading="lazy"
                      alt={product.name}
                      className="p-2 w-full h-auto"
                    />

                    <div className="px-4 py-2">
                      <h4 className="truncate font-bold text-sm">
                        {product.brand}
                      </h4>
                      <p className="truncate text-sm">{product.name}</p>
                    </div>
                    <p className="px-4 pb-3 text-sm md:text-xs space-x-1 truncate">
                      <span>Rs.{product.sellingPrice}</span>
                      <span className="line-through text-slate-500 text-[.8rem] lg:text-xs">
                        Rs. {product.retailPrice}
                      </span>{" "}
                      <span className="text-[#ff905a] text-[.8rem] md:text-[.8rem] lg:text-xs">
                        ({product.discount}% OFF)
                      </span>
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
