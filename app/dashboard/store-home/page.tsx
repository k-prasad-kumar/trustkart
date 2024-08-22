import { ArrowRight } from "lucide-react";
import Link from "next/link";

const StoreHomepage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4">
      <Link
        href={"/dashboard/store-home/hero"}
        className="py-2 px-4 border hover:border-primary flex gap-2 items-center"
      >
        Hero <ArrowRight size={14} />
      </Link>
      <Link
        href={"/dashboard/store-home/shop-by"}
        className="py-2 px-4 border hover:border-primary flex gap-2 items-center"
      >
        Shop By <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default StoreHomepage;
