import { BreadcrumbComponent } from "@/components/store/bread-crumb";
import { Orders } from "@/components/store/orders/orders";
import { fetchOrdersByUserId } from "@/lib/actions/user-actions";
import { OrderDBInterface } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";

const OrdersPage = async () => {
  const user = await currentUser();
  const id: string = user?.id!;

  const orders: OrderDBInterface[] | null = await fetchOrdersByUserId(id);

  const crumbs = [""];
  return (
    <>
      {orders && <BreadcrumbComponent crumbs={crumbs} page={`My Orders`} />}
      <Orders orders={orders} />
    </>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default OrdersPage;
