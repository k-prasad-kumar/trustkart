"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import { addReview } from "@/lib/actions/user-actions";
import { ReviewDBInterface } from "@/lib/types";

export const AddReview = ({
  productId,
  slug,
  userId,
  name,
  title,
  review,
  orderId,
}: {
  productId: string;
  slug: string;
  userId: string;
  name: string;
  title: string;
  review: ReviewDBInterface | null;
  orderId: string;
}) => {
  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || "");
  const [isPending, startTransition] = useTransition();

  const handleReview = () => {
    if (rating === 0) {
      toast.error("Please select rating");
      return;
    }
    if (comment === "") {
      toast.error("Please enter comment");
      return;
    }

    const review = {
      userId: userId,
      name: name,
      rating: rating,
      comment: comment,
      createdAt: new Date(),
      productId: productId,
    };
    startTransition(() => {
      addReview(review, slug, orderId || "")
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
          } else if (data?.error) {
            toast.error(data?.error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="text-primary text-sm font-medium flex gap-1 items-center">
        {title}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate this product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-3">
            <Star
              fill={rating > 0 ? "#7c3aed" : "none"}
              onClick={() => setRating(1)}
              color="#7c3aed"
              className="cursor-pointer"
            />
            <Star
              fill={rating > 1 ? "#7c3aed" : "none"}
              onClick={() => setRating(2)}
              color="#7c3aed"
              className="cursor-pointer"
            />
            <Star
              fill={rating > 2 ? "#7c3aed" : "none"}
              onClick={() => setRating(3)}
              color="#7c3aed"
              className="cursor-pointer"
            />
            <Star
              fill={rating > 3 ? "#7c3aed" : "none"}
              onClick={() => setRating(4)}
              color="#7c3aed"
              className="cursor-pointer"
            />
            <Star
              fill={rating > 4 ? "#7c3aed" : "none"}
              onClick={() => setRating(5)}
              color="#7c3aed"
              className="cursor-pointer"
            />
            {rating === 1 && (
              <p className="text-red-500 text-sm pl-2">Very Bad</p>
            )}
            {rating === 2 && (
              <p className="text-orange-500 text-sm pl-2">Bad</p>
            )}
            {rating === 3 && (
              <p className="text-yellow-500 text-sm pl-2">Good</p>
            )}
            {rating === 4 && (
              <p className="text-green-500 text-sm pl-2">Very Good</p>
            )}
            {rating === 5 && (
              <p className="text-emerald-500 text-sm pl-2">Excellent</p>
            )}
          </div>
          <div className="w-full">
            <Textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="Leave a comment"
              className="w-full mt-4 h-24 p-4 rounded-md"
            ></Textarea>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => handleReview()} disabled={isPending}>
            Add Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
