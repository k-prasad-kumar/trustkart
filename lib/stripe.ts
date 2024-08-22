import Stripe from "stripe";
const key: string = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string;

export const stripe = new Stripe(key, {
  apiVersion: "2024-06-20",
  typescript: true,
});
