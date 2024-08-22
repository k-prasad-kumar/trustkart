import { BreadcrumbComponent } from "@/components/store/bread-crumb";
import { OrderDetails } from "@/components/store/orders/order-details";
import { fetchOrderById } from "@/lib/actions/user-actions";
import { OrderDBInterface } from "@/lib/types";

const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id: string = params.id;

  const order: OrderDBInterface | null = await fetchOrderById(id);

  const crumbs = [`My Orders`];
  return (
    <>
      {order && <BreadcrumbComponent crumbs={crumbs} page={order.id} />}
      <OrderDetails order={order} />
    </>
  );
};
export default OrderDetailsPage;
