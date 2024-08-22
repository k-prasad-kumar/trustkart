import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReviewDBInterface } from "@/lib/types";
import { StarIcon } from "lucide-react";
import { Review } from "./review";

export const Reviews = ({
  rating,
  reviewCount,
  reviews,
  userId,
  slug,
}: {
  rating: string;
  reviewCount: number;
  reviews: ReviewDBInterface[] | undefined;
  userId: string;
  slug: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-2 border px-2 py-1 text-sm w-fit my-4">
          <p className="flex items-center gap-1">
            {reviewCount ? rating : 0}
            <span className="flex items-center">
              <StarIcon className="w-4 h-4" fill="#03a685" strokeWidth={0} />
            </span>
          </p>
          <span>|</span>
          <p>{reviewCount} Ratings</p>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold flex items-center gap-2 mb-2">
            Ratings{" "}
            <StarIcon className="w-5 h-5" fill="#03a685" strokeWidth={0} />
          </SheetTitle>
        </SheetHeader>
        {reviewCount === 0 && (
          <SheetDescription className="my-2">
            No reviews yet. Be the first!
          </SheetDescription>
        )}
        {reviews && (
          <ScrollArea className="w-full h-full pb-8">
            <div className="my-4 w-full flex flex-col items-center justify-center">
              <div className="flex gap-2 text-4xl font-light tracking-widest w-full">
                {rating ? rating : 0}{" "}
                <StarIcon className="w-8 h-8" fill="#03a685" strokeWidth={0} />
              </div>
              <SheetDescription className="my-2 w-full">
                {reviewCount} Verified Buyers
              </SheetDescription>
            </div>
            <div className="space-y-4">
              {reviews?.map((review: ReviewDBInterface, index: number) => (
                <Review
                  key={index}
                  review={review}
                  userId={userId}
                  slug={slug}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};
