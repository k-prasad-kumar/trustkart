import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { IndianRupeeIcon, MoveRight, Plus } from "lucide-react";
import { fetchRecentOrders } from "@/lib/actions/user-actions";
import { OrderDBInterface } from "@/lib/types";

export const RecentSales = async () => {
  const sales: OrderDBInterface[] | null = await fetchRecentOrders();

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl">Recent Sales</CardTitle>
          <CardDescription>
            Manage your Sales and view sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="overflow-y-auto">
            {sales && sales.length <= 0 && (
              <TableCaption>No Sales, Order Products To get sales</TableCaption>
            )}

            <TableBody>
              {sales &&
                sales.map((sale: OrderDBInterface) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <Image
                        src={sale.orderItems[0].image}
                        alt={"sales"}
                        width={35}
                        height={35}
                      />
                    </TableCell>
                    <TableCell className="truncate">
                      {sale.customerName}
                    </TableCell>
                    <TableCell className="truncate">
                      <span className="flex items-center">
                        <Plus size={12} />
                        <IndianRupeeIcon size={12} />
                        {sale.totalAmount}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button asChild variant={"ghost"}>
            <Link href={"/dashboard/orders"} className="text-primary space-x-2">
              {" "}
              <span>View Sales</span> <MoveRight strokeWidth={1.5} />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
