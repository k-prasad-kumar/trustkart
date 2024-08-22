import { DeleteReview } from "@/components/dashboard/reviews/delete-review";

const DeleteReviewPage = ({ params }: { params: { id: string } }) => {
  return <DeleteReview id={params.id} />;
};

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default DeleteReviewPage;
