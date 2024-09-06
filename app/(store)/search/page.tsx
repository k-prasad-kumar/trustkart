import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import noProduct from "@/assets/no-product.svg";
import { fetchProductsByQuery } from "@/lib/actions/product-actions";
import { ProductInterface } from "@/lib/types";
import { PaginationPage } from "@/components/pagination";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {
    q: string;
    page: string;
  };
}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";

  const res: { products: ProductInterface[]; count: number } | null =
    await fetchProductsByQuery(q, page);
  const count = res?.count;
  const itemsPerPage = Number(process.env.PRODUCTS_PER_PAGE as string);

  return (
    <>
      {res?.products && res?.products.length <= 0 ? (
        <div className="w-full h-[calc(100vh-4rem)] flex flex-col justify-center items-center gap-4">
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
        <div>
          <h1 className="text-xl mt-6">Search Results ({res?.count} items)</h1>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-4 mb-14">
            {res?.products &&
              res?.products?.map((product: any) => (
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
          <div className="mt-14">
            <PaginationPage count={count!} itemsPerPage={itemsPerPage} />
          </div>
        </div>
      )}
    </>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default SearchPage;
