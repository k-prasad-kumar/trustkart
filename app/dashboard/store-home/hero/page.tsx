import { HeroTable } from "@/components/dashboard/store-home/hero/hero";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Heropage = () => {
  return (
    <>
      <div className="w-full flex justify-end px-2 my-4">
        <Button asChild>
          <Link
            href={"/dashboard/store-home/hero/add"}
            className="flex space-x-1"
          >
            <PlusIcon size={20} /> <span>Add Hero</span>
          </Link>
        </Button>
      </div>
      <HeroTable />
    </>
  );
};
export default Heropage;
