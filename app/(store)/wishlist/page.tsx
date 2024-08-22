import { fetchWishlistByUserId } from "@/lib/actions/user-actions";
import { currentUser } from "@clerk/nextjs/server";
import { Wishlist } from "@/components/store/wishlist/wishlist";
import { WishlistDBInterface } from "@/lib/types";
import { fetchProductBySlug } from "@/lib/actions/product-actions";
import { BreadcrumbComponent } from "@/components/store/bread-crumb";

const WishlistPage = async () => {
  const user = await currentUser();
  const userId = user?.id!;

  const wishlist: WishlistDBInterface[] | null = await fetchWishlistByUserId(
    userId
  );

  const crumbs = [""];
  return (
    <>
      {wishlist && <BreadcrumbComponent crumbs={crumbs} page={`My Wishlist`} />}
      <Wishlist wishlist={wishlist} />
    </>
  );
};
export default WishlistPage;
