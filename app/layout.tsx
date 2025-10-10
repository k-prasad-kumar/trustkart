import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Suspense } from "react";
import loading from "./loading.gif";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Shopping for Men, Women Kids Fashion & Lifestyle - TrustKart",
  description:
    "Online Shopping for Men, Women Kids Fashion & Lifestyle - TrustKart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#7c3aed",
          },
        }}
      >
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-white">
              <Image src={loading} alt="Loading..." className="m-auto" />
            </div>}>
              {children}
            </Suspense>;
            
            <Toaster />
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";
