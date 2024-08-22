import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { PercentCircle, Truck } from "lucide-react";
import Googleplay from "@/assets/googleplay.png";
import Appstore from "@/assets/apple-store-dark.svg";
import Github from "@/assets/social/github.svg";
import Linkedin from "@/assets/social/linkedin.svg";
import Instagram from "@/assets/social/instagram.svg";
import Facebook from "@/assets/social/facebook.svg";

export const Footer = () => {
  return (
    <div className="w-full mt-8">
      <Separator />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
          <div className="w-full flex flex-col gap-2">
            <h1>ONLINE SHOPPING</h1>
            <Link href={"#"} className="hover:underline text-sm">
              Men
            </Link>
            <Link href={"#"} className="hover:underline text-sm">
              Women
            </Link>
            <Link href={"#"} className="hover:underline text-sm">
              Kids
            </Link>
          </div>
          <div className="w-full flex flex-col gap-2">
            <h1>CUSTOMER POLICIES</h1>
            <Link href={"#"} className="hover:underline text-sm">
              Contact Us
            </Link>
            <Link href={"#"} className="hover:underline text-sm">
              Privacy Policy
            </Link>
            <Link href={"#"} className="hover:underline text-sm">
              FAQ
            </Link>
            <Link href={"#"} className="hover:underline text-sm">
              Terms & Conditions
            </Link>
          </div>
          <div className="w-full">
            <h1 className="text-sm mb-4">EXPERIENCE TRUSTKART APP ON MOBILE</h1>
            <div className="flex gap-2 items-center">
              <Image
                src={Googleplay}
                width={100}
                height={100}
                alt="google play"
                sizes="100%"
                className="w-1/2 h-auto"
              />
              <Image
                src={Appstore}
                width={100}
                height={100}
                alt="app store"
                sizes="100%"
                className="w-1/2 h-auto"
              />
            </div>
          </div>

          <div className="w-full">
            <h1 className="text-sm">KEEP IN TOUCH</h1>
            <div className="flex items-center justify-around gap-4 mt-6">
              <Link
                href={"https://github.com/k-prasad-kumar"}
                className="p-2 w-full"
                target="_blank"
              >
                <Image
                  src={Github}
                  width={100}
                  height={100}
                  alt="app store"
                  sizes="100%"
                  className="w-full h-auto"
                />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/prasad-kumar-a77650142/"}
                className="p-2 w-full"
                target="_blank"
              >
                <Image
                  src={Linkedin}
                  width={100}
                  height={100}
                  alt="app store"
                  sizes="100%"
                  className="w-full h-auto"
                />
              </Link>
              <Link
                href={"https://www.instagram.com/its_me_prasad/"}
                className="p-2 w-full"
                target="_blank"
              >
                <Image
                  src={Instagram}
                  width={100}
                  height={100}
                  alt="app store"
                  sizes="100%"
                  className="w-full h-auto"
                />
              </Link>
              <Link
                href={"https://www.facebook.com/profile.php?id=100007472370525"}
                className="p-2 w-full"
                target="_blank"
              >
                <Image
                  src={Facebook}
                  width={100}
                  height={100}
                  alt="app store"
                  sizes="100%"
                  className="w-full h-auto"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-around gap-4 mt-10">
          <div className="flex items-center gap-4">
            <PercentCircle size={30} strokeWidth={1.4} color="grey" />
            <p className="text-sm">
              <span className="font-semibold">100% ORIGINAL</span> guarantee for
              all products at TrustKart
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Truck size={30} strokeWidth={1.4} color="grey" />
            <p className="text-sm">
              <span className="font-semibold">Get free delivery</span> for every
              order above ₹ 499
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-20 flex items-center justify-center">
        <p className="text-center text-sm font-light">
          Copyright © 2024 TrustKart. All rights reserved.
        </p>
      </div>
    </div>
  );
};
