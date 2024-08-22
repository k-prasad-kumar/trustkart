import { UpdateProductForm } from "@/components/dashboard/products/update-product";
import { fetchProductById } from "@/lib/actions/product-actions";

const UpdateProductPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const product = await fetchProductById(id);

  return (
    <>
      <UpdateProductForm product={product!} />
    </>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default UpdateProductPage;
