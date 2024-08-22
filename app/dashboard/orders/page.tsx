import { Search } from "@/components/dashboard/search";
import { Orders } from "@/components/dashboard/orders/orders";

const OrdersPage = ({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";
  return (
    <>
      <div className="flex flex-col w-full gap-4 py-8">
        <div className="flex justify-between items-center">
          <Search placeHolder="Search orders" />
        </div>
        <Orders q={q} page={page} />
      </div>
    </>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default OrdersPage;
