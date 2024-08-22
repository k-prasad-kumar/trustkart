import Image from "next/image";
import Link from "next/link";

import { OrderItemInterface, ReviewDBInterface } from "@/lib/types";
import { AddReview } from "../review/add-review";
import { fetchReview } from "@/lib/actions/user-actions";

export const OrderItem = async ({
  item,
  userId,
  name,
  orderId,
}: {
  item: OrderItemInterface | null;
  userId: string;
  name: string;
  orderId: string;
}) => {
  const review: ReviewDBInterface | null = await fetchReview(
    item?.productId!,
    userId
  );

  return (
    <div className="w-full">
      {item && (
        <div
          className="w-full flex gap-2 sm:gap-4 md:gap-8 hover:bg-gray-100 hover:dark:bg-gray-900 p-1 sm:p-2 md:p-2 border"
          key={item.slug}
        >
          <Link href={`/products/${item.slug}`}>
            <Image
              src={item.image}
              width={100}
              height={100}
              sizes="100%"
              loading="lazy"
              alt={"order image"}
              className="h-auto"
            />
          </Link>

          <div>
            <h1 className="font-medium">{item.brand}</h1>
            <p className="text-sm">{item.name}</p>
            <p className="text-sm space-x-2 my-2">
              <span>Size: {item.size}</span>
              <span>|</span>
              <span>Color: {item.color}</span>
            </p>
            <div className="mb-2">
              {review ? (
                <AddReview
                  productId={item.productId}
                  slug={item.slug}
                  userId={userId}
                  name={name}
                  orderId={orderId}
                  title={`${review?.rating} Edit Review`}
                  review={review}
                />
              ) : (
                <AddReview
                  productId={item.productId}
                  slug={item.slug}
                  userId={userId}
                  name={name}
                  orderId={orderId}
                  title="Rate & Review Product"
                  review={review}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
