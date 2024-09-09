import { Products } from "@/components/dashboard/products/products";
import { Search } from "@/components/dashboard/search";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const ProductsPage = ({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";
  return (
    <div className="flex flex-col w-full gap-4 py-8">
      <div className="flex justify-between items-center gap-4 sm:gap-14 md:gap-56 lg:gap-72">
        <Search placeHolder="Search products" />
        <Button asChild>
          <Link href={"/dashboard/products/add"} className="flex space-x-1">
            <PlusIcon size={20} /> <span>Add Product</span>
          </Link>
        </Button>
      </div>
      <Products q={q} page={page} />
    </div>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default ProductsPage;
