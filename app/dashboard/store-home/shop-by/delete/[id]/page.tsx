import { DeleteShopBy } from "@/components/dashboard/store-home/shop-by/delete-shop-by";

const DeleteShopByPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return <DeleteShopBy id={id} />;
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default DeleteShopByPage;
