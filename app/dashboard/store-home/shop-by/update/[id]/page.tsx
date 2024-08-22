import { UpdateShopByForm } from "@/components/dashboard/store-home/shop-by/update-shop-by";
import { fetchShopById } from "@/lib/actions/home-actions";
import { ShopByInterface } from "@/lib/types";

const UpdateHeroPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const shopBy: ShopByInterface | null = await fetchShopById(id);
  return (
    <>
      <UpdateShopByForm shopBy={shopBy} />
    </>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default UpdateHeroPage;
