import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import orderSuccess from "@/assets/order-success.svg";
import { stripe } from "@/lib/stripe";

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: { session_id: string };
}) => {
  const sessionId = searchParams?.session_id || "";
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center space-y-4 px-2 py-14 sm:px-8 lg:px-14">
        <div className="w-1/2">
          <Image
            src={orderSuccess}
            width={100}
            height={100}
            sizes="100%"
            loading="lazy"
            alt="success"
            className="w-fit h-auto"
          />
        </div>

        <div className="text-center space-y-4 w-full">
          <p className="font-medium">
            THANK YOU, {session?.metadata?.customerName}
          </p>
          <h1 className="text-xl md:text-3xl font-medium">
            YOUR ORDER IS CONFIRMED
          </h1>
          <p></p>
        </div>
        <Link href={"/orders"} className="flex gap-2 text-center">
          Go To Orders <MoveRight />
        </Link>
      </div>
    </div>
  );
};
export default PaymentSuccessPage;
