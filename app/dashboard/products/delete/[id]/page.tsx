import { DeleteProduct } from "@/components/dashboard/products/delete-product";

const DeleteProductPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <DeleteProduct id={params.id} />
    </>
  );
};
export default DeleteProductPage;
