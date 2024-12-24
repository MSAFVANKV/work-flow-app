import ScrollBanner from "@/components/landings/Home/ScrollBanners/ScrollBanner";
import SearchBar from "@/components/Search/Search_Bar";
import { Icon } from "@iconify/react";

export default function HomePage() {
  return (
    <div className=" mx-auto space-y-3">
      {/* search bar */}
      <div className="">
        <SearchBar />
      </div>

      <div className="snap-y relative snap-mandatory rounded-2xl h-[40vh] border overflow-y-scroll bg-gray-300 scrollbar-none">
        <div className="snap-start min-h-[40vh]  p-10 flex justify-center bg-gradient">
         <ScrollBanner
         titleClass=""
         className=""
         title="Upload Your Images "
         description="Keep Your images as privet and public"
         images={[
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
         ]}

         />
        </div>
        <div className="snap-start min-h-[40vh] bg-custom-gradient  p-10 flex items-center justify-center">
        <ScrollBanner
         title="Upload Your Videos "
          titleClass="text-white"
         description="Keep Your Videos as privet and public"
         images={[
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
         ]}

         />
        </div>
        <div className="snap-start min-h-[40vh] bg-gradient  p-10 flex items-center justify-center">
        <ScrollBanner
         title="Upload Your Audios "
         description="Create Your Own Music And Upload For free"
         images={[
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
         ]}

         />
        </div>

        {/* Add relative positioning to the parent */}
        <div className="absolute h-10 w-10 rounded-full border animate-bounce bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-center items-center">
          <Icon icon="fe:arrow-up" color="white" />
        </div>
      </div>
    </div>
  );
}
