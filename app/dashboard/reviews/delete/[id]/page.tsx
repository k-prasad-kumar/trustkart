import { DeleteReview } from "@/components/dashboard/reviews/delete-review";

const DeleteReviewPage = ({ params }: { params: { id: string } }) => {
  return <DeleteReview id={params.id} />;
};
export default DeleteReviewPage;
