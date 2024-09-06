import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationPage } from "@/components/pagination";
import { ReviewDBInterface } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchReviews } from "@/lib/actions/user-actions";
import { Eye, Star, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const DashboardReviews = async ({ page }: { page: string }) => {
  const res: { reviews: ReviewDBInterface[]; count: number } | null =
    await fetchReviews(page);

  const reviews = res?.reviews;
  const count = res?.count;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reviews</CardTitle>
          <CardDescription>Manage your reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            {reviews && reviews.length <= 0 && (
              <TableCaption>No reviews yet...</TableCaption>
            )}

            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="truncate">Comment</TableHead>
                <TableHead className="truncate">Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews &&
                reviews.map((review: ReviewDBInterface) => (
                  <TableRow key={review.id}>
                    <TableCell className="truncate">{review.name}</TableCell>
                    <TableCell className="truncate">{review.comment}</TableCell>
                    <TableCell className="truncate">
                      {" "}
                      <span className="text-lg">&#9734; </span> {review.rating}
                    </TableCell>

                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="link"
                            className="text-black dark:text-white"
                          >
                            <Eye size={18} strokeWidth={1.4} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{review.name}</DialogTitle>
                            <DialogDescription>
                              {review.comment}
                            </DialogDescription>
                            <DialogDescription className="flex gap-2 items-center">
                              <Star size={16} fill="#03a685" strokeWidth={0} />{" "}
                              {review.rating}
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <Button asChild>
                              <Link
                                href={`/dashboard/reviews/delete/${review.id}`}
                                className="flex items-center gap-2"
                              >
                                <Trash size={14} />
                                <span>Delete</span>
                              </Link>
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center">
          <PaginationPage
            count={count!}
            itemsPerPage={Number(process.env.REVIEWS_PER_PAGE)}
          />
        </CardFooter>
      </Card>
    </>
  );
};
