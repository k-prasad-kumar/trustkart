import pageNotFound from "@/assets/404-page.svg";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full sm:w-1/2 md:w-1/3 flex flex-col items-center justify-center">
        <Image
          src={pageNotFound}
          width={100}
          height={100}
          sizes="100%"
          loading="lazy"
          alt={"404 page not found"}
          className="w-1/2 h-auto"
        />
        <h1 className="text-xl font-semibold mt-8">Page Not Found</h1>
      </div>
    </div>
  );
};
export default NotFoundPage;
