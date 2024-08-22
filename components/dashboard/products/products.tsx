import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchProductsByQuery } from "@/lib/actions/product-actions";
import Image from "next/image";
import { ProductAction } from "./product-action-menu";
import { PaginationPage } from "@/components/pagination";
import { ProductInterface } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Products = async ({ q, page }: { q: string; page: string }) => {
  const res: { products: ProductInterface[]; count: number } | null =
    await fetchProductsByQuery(q, page);

  // destructure products and count
  const products = res?.products;
  const count = res?.count;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            {products && products.length <= 0 && (
              <TableCaption>
                No products, To add products click on{" "}
                <span className="text-primary font-medium">Add Product</span>
              </TableCaption>
            )}

            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead className="truncate">Product Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead className="truncate">Category</TableHead>
                <TableHead className="truncate">Sub Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products &&
                products.map((product: ProductInterface) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.images[0].url}
                        alt={product.name!}
                        width={40}
                        height={50}
                      />
                    </TableCell>
                    <TableCell className="truncate">{product.name}</TableCell>
                    <TableCell className="truncate">{product.brand}</TableCell>
                    <TableCell className="truncate">
                      {product.category}
                    </TableCell>
                    <TableCell className="truncate">
                      {product.subCategory}
                    </TableCell>
                    <TableCell>
                      <ProductAction id={product.id} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center">
          <PaginationPage
            count={count!}
            itemsPerPage={Number(process.env.PRODUCTS_PER_PAGE)}
          />
        </CardFooter>
      </Card>
    </>
  );
};
