import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { PaginationPage } from "@/components/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchOrders } from "@/lib/actions/user-actions";
import { OrderDBInterface } from "@/lib/types";
import { UpdateOrder } from "./update-order";

export const Orders = async ({ q, page }: { q: string; page: string }) => {
  const res = await fetchOrders(q, page);

  const orders = res?.orders;
  const count = res?.count;
  return (
    <div className="my-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Orders</CardTitle>
          <CardDescription>
            Manage your orders and view your sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            {orders && orders.length <= 0 && (
              <TableCaption>
                No Orders, orders can be added by ordering products
              </TableCaption>
            )}

            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead className="truncate">Name</TableHead>
                <TableHead className="truncate">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="truncate">Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders &&
                orders.map((order: OrderDBInterface) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Image
                        src={order.orderItems[0].image}
                        alt={order.orderItems[0].name}
                        width={40}
                        height={50}
                      />
                    </TableCell>
                    <TableCell className="truncate">
                      {order.customerName}
                    </TableCell>
                    <TableCell className="truncate">
                      ₹ {order.totalAmount}
                    </TableCell>
                    <TableCell className="truncate">
                      {order.paidAt.toString().slice(0, 10)}&nbsp;
                      {order.paidAt.getFullYear()}
                    </TableCell>
                    <TableCell className="truncate">
                      {order.orderStatus}
                    </TableCell>
                    <TableCell>
                      <UpdateOrder
                        id={order.id}
                        image={order.orderItems[0].image}
                        name={order.customerName}
                        price={order.totalAmount}
                        orderStatus={order.orderStatus}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center">
          <PaginationPage
            count={count!}
            itemsPerPage={Number(process.env.ORDERS_PER_PAGE)}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
