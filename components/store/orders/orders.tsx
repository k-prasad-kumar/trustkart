import { OrderDBInterface } from "@/lib/types";
import Image from "next/image";
import emptyWishlist from "@/assets/empty-wishlist.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, CircleCheck, Truck } from "lucide-react";
import { PaginationPage } from "@/components/pagination";

export const Orders = ({ orders }: { orders: OrderDBInterface[] | null }) => {
  return (
    <>
      {orders && orders.length <= 0 && (
        <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full sm:w-1/2 lg:w-1/3 gap-4">
            <Image
              src={emptyWishlist}
              width={100}
              height={100}
              sizes="100%"
              loading="lazy"
              alt={"no orders"}
              className="h-auto"
            />
            <h1 className="font-semibold text-lg">No Orders Found</h1>
            <p>You currently have no orders in your account.</p>
            <Button>
              <Link href={`/`}>CONTINUE SHOPPING</Link>
            </Button>
          </div>
        </div>
      )}
      <div className="w-full p-0 sm:p-2 md:p-4 flex flex-col gap-4 mt-4">
        <h1 className="font-medium tracking-wide text-lg">
          Orders ({orders?.length})
        </h1>
        {orders &&
          orders.length > 0 &&
          orders.map((order) => (
            <Link
              href={`/orders/${order.id}`}
              className="w-full flex gap-2 sm:gap-4 md:gap-8 hover:bg-gray-100 hover:dark:bg-gray-900 p-1 sm:p-2 md:p-2 border"
              key={order.id}
            >
              <Image
                src={order.orderItems[0].image}
                width={100}
                height={100}
                sizes="100%"
                loading="lazy"
                alt={"order image"}
                className="h-auto"
              />
              <div className="pt-0">
                <h1 className="font-medium">{order.orderItems[0].brand}</h1>
                <p className="text-sm">{order.orderItems[0].name}</p>
                <p className="text-sm space-x-2 my-2">
                  <span>Size: {order.orderItems[0].size}</span>
                  <span>|</span>
                  <span>Color: {order.orderItems[0].color}</span>
                </p>

                {order.orderStatus === "Order Confirmed" && (
                  <p className="text-[#7c3aed] flex items-center gap-1 py-4">
                    <Check size={14} />
                    {order.orderStatus}
                  </p>
                )}

                {order.orderStatus === "Shipped" && (
                  <p className="text-[#0db7af] flex items-center gap-1 py-4">
                    <Truck size={18} />
                    {order.orderStatus}
                  </p>
                )}

                {order.orderStatus === "Out For Delivery" && (
                  <p className="text-[#0db7af] flex items-center gap-2 py-4">
                    <Truck size={18} />
                    {order.orderStatus}
                  </p>
                )}

                {order.orderStatus === "Delivered" && (
                  <p className="text-green-500 flex items-center gap-1 py-4">
                    <CircleCheck size={16} />
                    {order.orderStatus}
                  </p>
                )}
              </div>
            </Link>
          ))}

        <PaginationPage itemsPerPage={10} count={orders?.length!} />
      </div>
    </>
  );
};
