import { UpdateHeroForm } from "@/components/dashboard/store-home/hero/update-hero";
import { fetchHeroById } from "@/lib/actions/home-actions";
import { HeroInterface } from "@/lib/types";

const UpdateHeroPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const hero: HeroInterface | null = await fetchHeroById(id);
  return (
    <>
      <UpdateHeroForm hero={hero} />
    </>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default UpdateHeroPage;
