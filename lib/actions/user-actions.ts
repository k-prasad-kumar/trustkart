"use server";

import { createClerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import {
  BagInterface,
  OrderDBInterface,
  ReviewInterface,
  WishlistInterface,
} from "../types";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const fetchUsers = async () => {
  try {
    const userList = await clerkClient.users.getUserList();

    return userList;
  } catch (error) {
    return null;
  }
};

export const addToBag = async (bagItem: BagInterface) => {
  try {
    const existingProduct = await prisma.cart.findFirst({
      where: {
        slug: bagItem.slug,
        userId: bagItem.userId,
      },
    });

    if (existingProduct) return { error: "Product already exists in bag" };

    await prisma.cart.create({
      data: {
        name: bagItem.name,
        slug: bagItem.slug,
        brand: bagItem.brand,
        color: bagItem.color,
        size: bagItem.size,
        quantity: bagItem.quantity,
        sellingPrice: bagItem.sellingPrice,
        retailPrice: bagItem.retailPrice,
        discount: bagItem.discount,
        image: bagItem.image,
        productId: bagItem.productId,
        userId: bagItem.userId,
      },
    });

    revalidatePath(`/bag`);
    revalidatePath(`/products/${bagItem.slug}`);

    return { success: "Product added to bag" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const updateQuantity = async (id: string, quantity: number) => {
  try {
    await prisma.cart.update({ where: { id }, data: { quantity: quantity } });
    revalidatePath(`/bag`);
    return { success: "Quantity updated" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const deleteBagItem = async (id: string) => {
  try {
    await prisma.cart.delete({ where: { id } });
    revalidatePath(`/bag`);
    return { success: "Product deleted from bag" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const fetchBagByUserId = async (userId: string) => {
  try {
    if (userId === undefined) return null;
    const bag = await prisma.cart.findMany({
      where: {
        userId,
      },
    });
    return bag;
  } catch (error) {
    return null;
  }
};

export const checkBag = async (slug: string, userId: string) => {
  try {
    if (userId === undefined) return null;
    const bag = await prisma.cart.findFirst({
      where: {
        slug,
        userId,
      },
    });
    return bag;
  } catch (error) {
    return null;
  }
};

export const addToWishlist = async (wishlist: WishlistInterface) => {
  try {
    const existingWishlist = await prisma.wishlist.findFirst({
      where: {
        slug: wishlist.slug,
        userId: wishlist.userId,
      },
    });

    if (existingWishlist)
      return { error: "Product already exists in wishlist" };

    await prisma.wishlist.create({
      data: {
        name: wishlist.name,
        slug: wishlist.slug,
        brand: wishlist.brand,
        color: wishlist.color,
        sellingPrice: wishlist.sellingPrice,
        retailPrice: wishlist.retailPrice,
        discount: wishlist.discount,
        image: wishlist.image,
        productId: wishlist.productId,
        userId: wishlist.userId,
      },
    });

    revalidatePath(`/wishlist`);
    return { success: "Product added to wishlist" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const fetchWishlistByUserId = async (userId: string) => {
  try {
    if (userId === undefined) return null;
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId,
      },
    });

    return wishlist;
  } catch (error) {
    return null;
  }
};

export const checkWishlist = async (slug: string, userId: string) => {
  try {
    if (userId === undefined) return null;
    const wishlist = await prisma.wishlist.findFirst({
      where: {
        slug,
        userId,
      },
    });

    return wishlist;
  } catch (error) {
    return null;
  }
};

export const deleteWishlist = async (id: string) => {
  try {
    await prisma.wishlist.delete({ where: { id } });
    revalidatePath(`/wishlist`);
    return { success: "Product deleted from wishlist" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

const ordersPerPage: number = parseInt(process.env.ORDERS_PER_PAGE!);

export const fetchOrders = async (q: string, page: string) => {
  try {
    const totalOrders: OrderDBInterface[] = await prisma.order.findMany({
      where: { customerName: { contains: q, mode: "insensitive" } },
    });

    const orders: OrderDBInterface[] = await prisma.order.findMany({
      where: { customerName: { contains: q, mode: "insensitive" } },
      take: ordersPerPage,
      skip: ordersPerPage * (Number(page) - 1),
    });

    const count: number = totalOrders.length;
    return { orders, count };
  } catch (error) {
    return null;
  }
};

export const fetchRecentOrders = async () => {
  try {
    const orders: OrderDBInterface[] = await prisma.order.findMany({
      take: 5,
    });

    return orders;
  } catch (error) {
    return null;
  }
};

export const fetchOrdersByUserId = async (userId: string) => {
  try {
    if (userId === undefined) return null;
    const orders = await prisma.order.findMany({
      where: {
        customerId: userId,
      },
    });

    return orders;
  } catch (error) {
    return null;
  }
};

export const fetchOrderById = async (id: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
    });

    return order;
  } catch (error) {
    return null;
  }
};

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    if (status === "Shipped") {
      await prisma.order.update({
        where: {
          id,
        },
        data: {
          orderStatus: status,
          shippedAt: new Date(),
        },
      });
    } else if (status === "Out For Delivery") {
      await prisma.order.update({
        where: {
          id,
        },
        data: {
          orderStatus: status,
          outForDeliveryAt: new Date(),
        },
      });
    } else if (status === "Delivered") {
      await prisma.order.update({
        where: {
          id,
        },
        data: {
          orderStatus: status,
          deliveredAt: new Date(),
        },
      });
    }

    revalidatePath(`/dashboard/orders`);
    return { success: "Order status updated" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const addReview = async (
  reviewData: ReviewInterface,
  slug: string,
  orderId: string
) => {
  try {
    const productReview = await prisma.review.findMany({
      where: {
        productId: reviewData.productId,
      },
    });

    // product has not reviewed
    if (!productReview) {
      await prisma.review.create({
        data: reviewData,
      });
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        userId: reviewData.userId,
        productId: reviewData.productId,
      },
    });

    // user has reviewed the product
    if (existingReview) {
      await prisma.review.update({
        where: {
          id: existingReview.id,
        },

        data: {
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
      });
    }

    // user has not reviewed the product
    if (!existingReview) {
      await prisma.review.create({
        data: reviewData,
      });
    }

    revalidatePath(`/products/${slug}`);

    if (orderId) revalidatePath(`/orders/${orderId}`);

    return { success: "Review added" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const deleteReviewById = async (id: string) => {
  try {
    await prisma.review.delete({
      where: {
        id: id,
      },
    });

    revalidatePath(`/dashboard/reviews`);
    return { success: "Review deleted" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const fetchReviews = async (page: string) => {
  const reviewsPerPage: number = Number(process.env.REVIEWS_PER_PAGE);
  try {
    const reviewsCount = await prisma.review.findMany();
    const reviews = await prisma.review.findMany({
      take: reviewsPerPage,
      skip: reviewsPerPage * (Number(page) - 1),
    });

    return { reviews, count: reviewsCount.length };
  } catch (error) {
    return null;
  }
};

export const fetchReview = async (productId: string, userId: string) => {
  try {
    const review = await prisma.review.findFirst({
      where: {
        productId: productId,
        userId: userId,
      },
    });

    return review;
  } catch (error) {
    return null;
  }
};
