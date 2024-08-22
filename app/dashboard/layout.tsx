import { Header } from "@/components/dashboard/layout/header";
import { Footer } from "@/components/store/layout/footer";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  const role = user?.publicMetadata.role;
  if (role !== "admin") redirect("/");
  return (
    <>
      <Header />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        {children}
      </div>
      <Footer />
    </>
  );
};
export default DashboardLayout;
