import { Button } from "../ui/button"


type Props = {}

export default function SearchBar({}: Props) {
  return (
    <div className="border rounded-md h-14 w-full flex">
      <div className="h-full sm:w-[20%] w-[30%] border-r flex justify-center items-center ">
       <span className="text-xs"> Search All Assets</span>
      </div>
      
      <div className="p-2 flex w-full ">
      <input
        className="w-full border-none focus:outline-none text-sm"
        type="text"
        placeholder="Search"
      />
      <Button className="">
        Search
      </Button>
      </div>
    </div>
  )
}