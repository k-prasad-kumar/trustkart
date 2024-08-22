import { Bag } from "@/components/store/bag/bag";
import { BreadcrumbComponent } from "@/components/store/bread-crumb";
import { fetchBagByUserId } from "@/lib/actions/user-actions";
import { BagDBInterface } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";

const BagPage = async () => {
  const user = await currentUser();
  const id: string = user?.id!;
  const name = user?.fullName!;

  const bag: BagDBInterface[] | null = await fetchBagByUserId(id);
  const crumbs = [""];
  return (
    <>
      {bag && <BreadcrumbComponent crumbs={crumbs} page={`My Bag`} />}
      <Bag bag={bag} name={name} />
    </>
  );
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default BagPage;
