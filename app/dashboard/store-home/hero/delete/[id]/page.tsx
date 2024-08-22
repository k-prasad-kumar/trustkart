import { DeleteHero } from "@/components/dashboard/store-home/hero/delete-hero";

const DeleteHeroPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return <DeleteHero id={id} />;
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default DeleteHeroPage;
