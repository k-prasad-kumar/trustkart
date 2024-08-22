"use client";

import { ReviewDBInterface } from "@/lib/types";
import { Star } from "lucide-react";
import { AddReview } from "./add-review";

export const Review = ({
  review,
  userId,
  slug,
}: {
  review: ReviewDBInterface;
  userId: string;
  slug: string;
}) => {
  return (
    <div className="space-y-4 p-2 md:p-4 border flex flex-col my-4 max-w-[70%] sm:max-w-[93%]">
      <div className="flex items-center justify-between">
        <p className="text-sm flex items-center gap-2 text-emerald-500">
          <Star size={14} fill="#03a685" />
          {review.rating}
        </p>

        {review.userId === userId && (
          <AddReview
            productId={review.productId}
            title="Edit"
            orderId=""
            name={review.name}
            slug={slug}
            review={review}
            userId={userId}
          />
        )}
      </div>
      <p className="text-sm">{review.comment}</p>
      <p className="text-xs">
        <span>{review.name}</span> <span>|</span>{" "}
        <span>
          {review.createdAt.toString().slice(0, 10)}{" "}
          {review.createdAt.getFullYear()}
        </span>
      </p>
    </div>
  );
};
