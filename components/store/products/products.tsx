import Image from "next/image";
import Link from "next/link";

import { ProductFilter } from "./products-filter";
import { ProductInterface } from "@/lib/types";
import { MobileFilter } from "./mobile-filter";
import noProduct from "@/assets/no-product.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PaginationPage } from "@/components/pagination";
import { ProductsSort } from "./products-sort";

export const Products = ({
  products,
  count,
  brands,
  colors,
}: {
  products: ProductInterface[] | undefined;
  count: number | undefined;
  brands: (string | undefined)[] | undefined;
  colors: (string | undefined)[] | undefined;
}) => {
  const itemsPerPage = Number(process.env.PRODUCTS_PER_PAGE);

  return (
    <>
      {products && products.length <= 0 ? (
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

          <h1 className="tracking-wide">No Products Found</h1>

          <Button asChild className="my-4">
            <Link href={"/"}>CONTINUE SHOPPING</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex w-full my-4">
            <div className="hidden md:block w-full md:w-1/4 lg:w-1/6 py-4">
              <h1>FILTERS</h1>
              <ProductFilter colors={colors} brands={brands} />
            </div>
            <div className="fixed bottom-0 right-1 z-10 w-full h-10 md:hidden bg-background flex justify-center items-center mx-auto shadow border">
              <MobileFilter>
                <div className="flex-col-reverse gap-4">
                  <ProductFilter colors={colors} brands={brands} />
                  <Separator className="my-4" />
                  <ProductsSort />
                </div>
              </MobileFilter>
            </div>

            <div className="w-full md:w-3/4 lg:w-5/6 m-2 md:m-4">
              <div className="justify-between mb-2 hidden md:flex">
                <p>
                  {products?.[0].subCategory} -{" "}
                  <span className="dark:text-slate-300 text-slate-500">
                    {count} items
                  </span>
                </p>
                <ProductsSort />
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products &&
                  products?.map((product: ProductInterface) => (
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
                        alt={product.name!}
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
              <div className="w-full my-4">
                <Separator className="my-4" />
                <PaginationPage count={count!} itemsPerPage={itemsPerPage} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
