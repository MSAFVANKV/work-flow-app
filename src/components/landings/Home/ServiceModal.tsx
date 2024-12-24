import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

type Props = {
    title: string;
    data: any;
    onClick: (val:any) => void;
    description: string;
    inputType: string;
    subtitle: string;
    name: string;
}

export default function ServiceModal({
    title,
    data,
    onClick,
    description,
    inputType,
    subtitle,
    name,
   
}: Props) {
  return (
    <Dialog>
  <DialogTrigger>{title}</DialogTrigger>
  <DialogContent className="min-h-[60vh]">
    <DialogHeader>
      <DialogTitle>{subtitle}</DialogTitle>
      <DialogDescription>
       {description}
      </DialogDescription>
      <form action="">
        <input type={inputType} name={name} />
        <button onClick={() => onClick(data)}>Submit</button>
      </form>

    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}