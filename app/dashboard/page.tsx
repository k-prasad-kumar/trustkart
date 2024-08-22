import { SalesChart } from "@/components/dashboard/sales-chart";
import { RecentSales } from "@/components/dashboard/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchDashboard } from "@/lib/actions/dashboard-actions";
import { fetchUsers } from "@/lib/actions/user-actions";

import {
  IndianRupee,
  ShoppingBag,
  ShoppingBasket,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
  const users = await fetchUsers();
  const usersCount: number | undefined = users?.totalCount;

  const total = await fetchDashboard();

  return (
    <div className="mt-4">
      <div className="flex flex-wrap justify-between gap-4 md:gap-6">
        <Card className="w-full md:w-1/5 md:min-w-fit flex-grow">
          <CardHeader>
            <CardTitle className="flex justify-between text-xl font-medium truncate gap-4 md:gap-8">
              <span>Total Products</span>
              <ShoppingBag className="text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-semibold">{total?.totalProducts}</h1>
          </CardContent>
          <CardFooter>
            <CardDescription>
              <Link href={"/dashboard/products"}>View details</Link>
            </CardDescription>
          </CardFooter>
        </Card>
        <Card className="w-full md:w-1/5 md:min-w-fit flex-grow">
          <CardHeader>
            <CardTitle className="flex justify-between text-xl font-medium truncate gap-4 md:gap-8">
              <span>Total Users</span>
              <UsersRound className="text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-semibold">{usersCount}</h1>
          </CardContent>
          <CardFooter>
            <CardDescription>
              <Link href={"/dashboard/users"}>View details</Link>
            </CardDescription>
          </CardFooter>
        </Card>
        <Card className="w-full md:w-1/5 md:min-w-fit flex-grow">
          <CardHeader>
            <CardTitle className="flex justify-between text-xl font-medium truncate gap-4 md:gap-8">
              <span>Total Sales</span>
              <ShoppingBasket className="text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-semibold">{total?.totalSales}</h1>
          </CardContent>
          <CardFooter>
            <CardDescription>
              <Link href={"/dashboard/orders"}>View details</Link>
            </CardDescription>
          </CardFooter>
        </Card>
        <Card className="w-full md:w-1/5 md:min-w-fit flex-grow">
          <CardHeader>
            <CardTitle className="flex justify-between text-xl font-medium truncate gap-4 md:gap-8">
              <span>Total Revenue</span>
              <IndianRupee className="text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-semibold">
              ₹ {total?.totalRevenue}
              <span>.00</span>
            </h1>
          </CardContent>
          <CardFooter>
            <CardDescription>View details</CardDescription>
          </CardFooter>
        </Card>
      </div>
      <div className="flex justify-between flex-col lg:flex-row my-6 w-full gap-4">
        <div className="w-full lg:w-2/3">
          <SalesChart />
        </div>
        <RecentSales />
      </div>
    </div>
  );
};

export default DashboardPage;
