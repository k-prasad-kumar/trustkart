import { OrderDBInterface } from "@/lib/types";
import { Package, PackageCheck, Truck } from "lucide-react";
import { OrderItem } from "./order-item";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export const OrderDetails = ({ order }: { order: OrderDBInterface | null }) => {
  const totalRetailPrice = order?.orderItems.reduce(
    (acc, item) => acc + item.retailPrice * item.quantity,
    0
  );

  const discount = totalRetailPrice! - (order?.totalAmount! - order?.shippingCost!);
  return (
    <div className="w-full py-4 md:p-4 space-y-4">
      <div className="p-4 w-full border space-y-1">
        <h1 className="font-medium flex items-center gap-4">
          Delivery Address
        </h1>
        <h2 className="py-2 text-sm">{order?.shippingAddress.name}</h2>
        <p className="text-xs">{order?.shippingAddress?.address}</p>
        <p className="text-xs">{order?.shippingAddress?.city}</p>
        <div className="flex gap-2 text-xs">
          <p>{order?.shippingAddress?.state},</p>
          <p>{order?.shippingAddress?.country} -</p>
          <p>{order?.shippingAddress?.postalCode}</p>
        </div>
      </div>
      <div className="flex justify-between p-4 border">
        <div>
          <h2 className="font-medium">Total Order Price</h2>
          <p className="text-xs">
            You saved
            <span className="text-[#03a685] text-sm font-medium">
              {" "}
              ₹ {discount}.00{" "}
            </span>{" "}
            on this order
          </p>
        </div>
        <div>
          <h2 className="flex items-center gap-1 font-medium">
            {" "}
            ₹ {order?.totalAmount}.00
          </h2>
          <Dialog>
            <DialogTrigger className="text-sm font-semibold text-primary">
              View Breakup
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Payment Information</DialogTitle>
              {order?.orderItems.map((item) => (
                <div key={item.slug} className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <p className="text-xs truncate">
                      {item.quantity} x {item.name}
                    </p>
                    <p className="text-xs font font-medium min-w-fit">
                      ₹ {item.retailPrice * item.quantity}
                    </p>
                  </div>
                  <div key={item.slug} className="flex justify-between">
                    <p className="text-xs">Discount</p>
                    <p className="text-xs font font-medium">
                      - ₹{" "}
                      {item.retailPrice * item.quantity -
                        item.price * item.quantity}
                    </p>
                  </div>
                  <div key={item.slug} className="flex justify-between">
                    <p className="text-xs">Discounted Price</p>
                    <p className="text-xs font font-medium">
                      ₹{" "}
                      {item.retailPrice * item.quantity -
                        (item.retailPrice * item.quantity -
                          item.price * item.quantity)}
                    </p>
                  </div>
                  <Separator />
                </div>
              ))}
              <div className="flex justify-between">
                <p className="text-xs font-medium">Shipping Charge</p>
                <p className="text-xs font-medium">₹ {order?.shippingCost}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold">Total Paid</p>
                <p className="text-sm font-semibold">₹ {order?.totalAmount}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* order status */}
      <div
        className={`${
          order?.orderStatus === "Delivered" ? "bg-[#03a685]" : "bg-primary"
        } p-4 text-white space-y-1`}
      >
        {order?.orderStatus === "Order Confirmed" && (
          <>
            <h2 className="font-medium flex items-center gap-4">
              <Package /> {order?.orderStatus}
            </h2>
            <p className="text-xs pl-10">
              On {order?.confirmedAt.toString().slice(0, 10)}{" "}
              {order?.confirmedAt.getFullYear()}
            </p>
          </>
        )}
        {order?.orderStatus === "Shipped" && (
          <>
            <h2 className="font-medium flex items-center gap-4">
              <Truck /> {order?.orderStatus}
            </h2>
            <p className="text-xs pl-10">
              On {order?.shippedAt.toString().slice(0, 10)}{" "}
              {order?.shippedAt.getFullYear()}
            </p>
          </>
        )}
        {order?.orderStatus === "Out For Delivery" && (
          <>
            <h2 className="font-medium flex items-center gap-4">
              <Truck /> {order?.orderStatus}
            </h2>
            <p className="text-xs pl-10">
              On {order?.outForDeliveryAt.toString().slice(0, 10)}{" "}
              {order?.outForDeliveryAt.getFullYear()}
            </p>
          </>
        )}
        {order?.orderStatus === "Delivered" && (
          <>
            <h2 className="font-medium flex items-center gap-4">
              <PackageCheck /> {order?.orderStatus}
            </h2>
            <p className="text-xs pl-10">
              On {order?.deliveredAt.toString().slice(0, 10)}{" "}
              {order?.deliveredAt.getFullYear()}
            </p>
          </>
        )}
      </div>
      <div className="w-full p-0 sm:p-2 md:p-4 flex flex-col gap-4 mt-4">
        <h1 className="font-medium tracking-wide">Items in this order</h1>
        {order &&
          order.orderItems.map((item) => (
            <div key={item.slug}>
              <OrderItem
                item={item}
                userId={order?.customerId}
                name={order?.customerName}
                orderId={order?.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
