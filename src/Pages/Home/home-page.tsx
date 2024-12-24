import SearchBar from "@/components/Search/Search_Bar";
import { Icon } from "@iconify/react";

export default function HomePage() {
  return (
    <div className="p-4 max-w-screen-2xl mx-auto space-y-3">

      {/* search bar */}
      <div className="">
        <SearchBar />
      </div>
      
      <div className="snap-y relative snap-mandatory rounded-2xl h-[40vh] border overflow-y-scroll bg-gray-300 scrollbar-none">
        <div className="snap-start h-full border p-10 flex justify-center bg-gradient">
          <div className="flex flex-col">
            <h1 className="text-black font-bold font-mono text-3xl">Upload Your Images</h1>
          </div>
        </div>
        <div className="snap-start h-full bg-green-200 border p-10 flex items-center justify-center">
          Section 2
        </div>
        <div className="snap-start h-full bg-blue-200 border p-10 flex items-center justify-center">
          Section 3
        </div>

        {/* Add relative positioning to the parent */}
        <div className="absolute h-10 w-10 rounded-full border animate-bounce bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-center items-center">
          <Icon icon="fe:arrow-up" color="white" />
        </div>
      </div>
    
    </div>
  );
}
