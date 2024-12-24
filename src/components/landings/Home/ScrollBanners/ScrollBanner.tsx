import { cn } from "@/lib/utils";



type Props = {
    title: string;
    description: string;
    images: string[];
    className?: string;
    titleClass?: string;
    imgClass?: string;
    descClass?: string;
}

export default function ScrollBanner({
    title,
    description,
    images,
    className,
    titleClass,
    imgClass,
    descClass,
}:Props) {
  return (
    <div className={cn(`flex flex-col items-center gap-3 justify-around`,className)}>
    <h1 className={cn(`text-black font-bold font-mono md:text-3xl text-lg`,titleClass)}>
        {title}
  
    </h1>
    <span className={cn(`sm:text-sm text-xs`,descClass)}>
        {description}
    </span>

    {/* images === */}
    <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
      {images.map((items) => (
        <div className="">
          <div className="w-[100px] h-[100px] rounded-sm overflow-hidden relative">
            <img src={items} alt="" className={cn(`object-cover`,imgClass)} />
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}