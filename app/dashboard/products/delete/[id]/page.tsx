import { DeleteProduct } from "@/components/dashboard/products/delete-product";

const DeleteProductPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <DeleteProduct id={params.id} />
    </>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default DeleteProductPage;
