import { DashboardReviews } from "@/components/dashboard/reviews/reviews";

const ReviewsPage = ({ searchParams }: { searchParams: { page: string } }) => {
  return <DashboardReviews page={searchParams.page || "1"} />;
};
export default ReviewsPage;
