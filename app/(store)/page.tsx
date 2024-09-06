import { BrandCarousel } from "@/components/store/home/brand-carousel";
import { CategoryCarousel } from "@/components/store/home/category-carousel";
import { HomeCarousel } from "@/components/store/home/hero-carousel";
import { NewArrivals } from "@/components/store/home/new-arrivals";
import { fetchHero, fetchShopByType } from "@/lib/actions/home-actions";
import { fetchRecentProducts } from "@/lib/actions/product-actions";
import { HeroInterface, ShopByInterface } from "@/lib/types";

const Home = async () => {
  const hero: HeroInterface[] | null = await fetchHero();
  const recentProducts = await fetchRecentProducts();
  const brands: ShopByInterface[] | null = await fetchShopByType("brand");
  const categories: ShopByInterface[] | null = await fetchShopByType(
    "category"
  );

  return (
    <>
      <HomeCarousel hero={hero} />

      <h1 className="text-3xl uppercase mt-14 mb-4 tracking-wider">
        Shop By Brand
      </h1>
      <BrandCarousel shopBy={brands} />

      <h1 className="text-3xl uppercase mt-14 mb-4 tracking-wider">
        Shop By Category
      </h1>
      <CategoryCarousel shopBy={categories} />

      <h1 className="text-3xl uppercase mt-14 mb-4 tracking-wider">
        New Arrivals
      </h1>
      <NewArrivals shopBy={recentProducts} />
    </>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default Home;
