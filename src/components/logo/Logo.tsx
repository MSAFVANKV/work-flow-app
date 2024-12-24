import { cn } from "@/lib/utils";

export default function Logo({ className, alt="logo" }: any) {
  return (
    <div className="">
      <img src="/logo/mainlogo.png" draggable={false} alt={alt} className={cn(`w-14 h-14 `,className)} />
    </div>
  );
}
