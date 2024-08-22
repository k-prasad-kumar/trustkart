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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchShopBy } from "@/lib/actions/home-actions";
import { ShopByInterface } from "@/lib/types";
import { ShopByAction } from "./shop-by-actions";

export const ShopByTable = async () => {
  const shopBy = await fetchShopBy();
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle className="text-2xl">Shop By</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            {shopBy && shopBy.length <= 0 && (
              <TableCaption>
                No Shop By Items, To add Shop By Item click on{" "}
                <span className="text-primary font-medium">Add Shop By</span>
              </TableCaption>
            )}

            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead className="truncate">Title</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead className="truncate">Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shopBy &&
                shopBy.map((item: ShopByInterface) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={40}
                        height={50}
                      />
                    </TableCell>
                    <TableCell className="truncate">{item.title}</TableCell>
                    <TableCell className="truncate">{item.discount}</TableCell>
                    <TableCell className="truncate">{item.type}</TableCell>
                    <TableCell>
                      <ShopByAction id={item.id} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
