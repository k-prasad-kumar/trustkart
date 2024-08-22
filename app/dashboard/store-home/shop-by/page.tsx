import { ShopByTable } from "@/components/dashboard/store-home/shop-by/shop-by";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const ShopByPage = () => {
  return (
    <>
      <div className="w-full flex justify-end px-2 my-4">
        <Button asChild>
          <Link
            href={"/dashboard/store-home/shop-by/add"}
            className="flex space-x-1"
          >
            <PlusIcon size={20} /> <span>Add Shop By</span>
          </Link>
        </Button>
      </div>
      <ShopByTable />
    </>
  );
};
export default ShopByPage;
