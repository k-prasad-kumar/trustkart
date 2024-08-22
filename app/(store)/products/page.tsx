import { BreadcrumbComponent } from "@/components/store/bread-crumb";
import { Products } from "@/components/store/products/products";
import { fetchProductsByTags } from "@/lib/actions/product-actions";
import { ProductInterface } from "@/lib/types";
import { redirect } from "next/navigation";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: {
    category: string;
    subCategory: string;
    brand: string;
    color: string;
    discount: string;
    sort: string;
    page: string;
  };
}) => {
  const { category, subCategory, brand, color, discount, sort, page } =
    searchParams;

  if (!category || !subCategory) redirect("/");

  const tags: string[] = [category, subCategory.toLowerCase()];
  if (brand) tags.push(brand.toLowerCase());
  if (color) tags.push(color.toLowerCase());
  if (discount) tags.push(discount);

  const res: { products: ProductInterface[]; count: number } | null =
    await fetchProductsByTags(tags, page || "1");

  // getting unique brands and colors from products
  const colors = Array.from(
    new Set(res?.products.map((product) => product.color))
  );
  const brands = Array.from(
    new Set(res?.products.map((product) => product.brand))
  );

  // sorting products
  if (sort === "low-to-high") {
    res?.products.sort((a, b) => a.sellingPrice! - b.sellingPrice!);
  } else if (sort === "high-to-low") {
    res?.products.sort((a, b) => b.sellingPrice! - a.sellingPrice!);
  } else if (sort === "better discount") {
    res?.products.sort((a, b) => a.discount! - b.discount!);
  }

  const crumbs = ["Clothing"];

  return (
    <>
      {res?.products && (
        <BreadcrumbComponent
          crumbs={crumbs}
          page={`${category} ${subCategory}`}
        />
      )}
      <Products
        products={res?.products}
        count={res?.count}
        brands={brands}
        colors={colors}
      />
    </>
  );
};
export default ProductsPage;
