import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { updateSalesCount } from "@/lib/actions/dashboard-actions";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const transactionId = session?.id;
      const name = session?.metadata?.customerName;
      const userId = session?.client_reference_id;
      const sub_total = session?.amount_subtotal;
      const total_amount = session?.amount_total;

      const shipping = total_amount! - sub_total! === 0 ? "Free" : "Express";
      const shippingCost = (total_amount! - sub_total!) / 100;

      const shippingAddress = {
        name: session?.shipping_details?.name,
        street: session?.shipping_details?.address?.line1,
        city: session?.shipping_details?.address?.city,
        state: session?.shipping_details?.address?.state,
        postalCode: session?.shipping_details?.address?.postal_code,
        country: session?.shipping_details?.address?.country,
      };

      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items.data.price.product"] }
      );

      const lineItems = retrieveSession?.line_items?.data;

      const deleteItems = lineItems?.map((item: any) => {
        return item.price.product.metadata.id;
      });

      const orderItems = lineItems?.map((item: any) => {
        return {
          name: item.price.product.metadata.name,
          slug: item.price.product.metadata.slug,
          brand: item.price.product.metadata.brand,
          color: item.price.product.metadata.color,
          size: item.price.product.metadata.size,
          price: item.price.unit_amount / 100,
          retailPrice: parseInt(item.price.product.metadata.retailPrice),
          image: item.price.product.metadata.image,
          quantity: item.quantity,
          productId: item.price.product.metadata.productId,
        };
      });

      await prisma.order.create({
        data: {
          transactionId: transactionId,
          subTotal: sub_total! / 100,
          totalAmount: total_amount! / 100,

          shippingAddress: {
            name: shippingAddress.name!,
            address: shippingAddress.street!,
            city: shippingAddress.city!,
            state: shippingAddress.state!,
            postalCode: shippingAddress.postalCode!,
            country: shippingAddress.country!,
          },
          orderItems: orderItems,
          orderStatus: "Order Confirmed",
          customerId: userId!,
          customerName: name!,
          shipping: shipping,
          shippingCost: shippingCost,
          isPaid: true,
        },
      });

      deleteItems?.map(async (item: any) => {
        await prisma.cart.delete({
          where: {
            id: item,
          },
        });
      });

      await updateSalesCount(total_amount! / 100);

      revalidatePath(`/orders`);
      revalidatePath(`/bag`);
      revalidatePath(`/dashboard`);
      revalidatePath(`/dashboard/orders`);
    }

    return new NextResponse("Order created", { status: 200 });
  } catch (err) {
    console.log("[webhooks_POST]", err);
    return new NextResponse("Failed to create the order", { status: 500 });
  }
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";
