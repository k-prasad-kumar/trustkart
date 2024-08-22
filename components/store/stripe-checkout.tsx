"use server";

import { stripe } from "@/lib/stripe";
import { BagInterface } from "../../lib/types";

export const stripeCheckout = async (
  cartItems: BagInterface[] | null,
  customerName: string
) => {
  try {
    if (!cartItems) {
      return { error: "Cart Items not found" };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      shipping_options: [
        { shipping_rate: "shr_1PmbXaSA0wVpk2KMzoY7HpX6" },
        { shipping_rate: "shr_1PnMNuSA0wVpk2KMQwRGSVdI" },
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: cartItem.name,
            images: [cartItem.image],
            metadata: {
              id: cartItem.id,
              name: cartItem.name,
              slug: cartItem.slug,
              brand: cartItem.brand,
              image: cartItem.image,
              size: cartItem.size,
              color: cartItem.color,
              retailPrice: cartItem.retailPrice,
              productId: cartItem.productId,
            },
          },
          unit_amount: cartItem.sellingPrice * 100,
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: cartItems[0].userId,
      metadata: {
        customerName: customerName,
      },
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/bag`,
    });
    return { success: session };
  } catch (err) {
    return { error: "Something went wrong" };
  }
};
