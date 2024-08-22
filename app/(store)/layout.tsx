import { Footer } from "@/components/store/layout/footer";
import { Header } from "@/components/store/layout/header";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
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
export default StoreLayout;
