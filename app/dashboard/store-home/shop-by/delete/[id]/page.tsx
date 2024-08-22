import { DeleteShopBy } from "@/components/dashboard/store-home/shop-by/delete-shop-by";

const DeleteShopByPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return <DeleteShopBy id={id} />;
};
export default DeleteShopByPage;
