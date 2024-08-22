import { BreadcrumbComponent } from "@/components/store/bread-crumb";
import { ProductDetails } from "@/components/store/products/product-details";
import {
  fetchProductBySlug,
  fetchRelatedProducts,
} from "@/lib/actions/product-actions";
import { checkBag, checkWishlist } from "@/lib/actions/user-actions";
import { ProductDetailsDBInterface, ProductInterface } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";

const ProductDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const user = await currentUser();
  const userId = user?.id!;

  const { slug } = params;
  const product: ProductDetailsDBInterface | null = await fetchProductBySlug(
    slug
  );
  const relatedProducts: ProductInterface[] | null = await fetchRelatedProducts(
    slug
  );
  const bag = await checkBag(slug, userId);
  const wishlist = await checkWishlist(slug, userId);

  const reviews = product?.reviews!;
  const reviewCount = reviews?.length;
  const totalRating = reviews?.reduce((sum, review) => sum + review.rating, 0);

  const rating: string = (totalRating! / reviewCount!).toFixed(1);

  const crumbs = ["Clothing"];
  return (
    <div className="w-full my-4">
      {product && <BreadcrumbComponent crumbs={crumbs} page={product.name!} />}
      <ProductDetails
        product={product}
        relatedProducts={relatedProducts}
        id={userId}
        bag={bag ? true : false}
        wishlist={wishlist ? true : false}
        reviews={reviews}
        rating={rating}
        reviewCount={reviewCount!}
      />
    </div>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default ProductDetailsPage;
