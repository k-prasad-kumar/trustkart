import { DeleteHero } from "@/components/dashboard/store-home/hero/delete-hero";

const DeleteHeroPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return <DeleteHero id={id} />;
};
export default DeleteHeroPage;
