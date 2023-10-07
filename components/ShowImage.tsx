import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Image from "next/image"
// import { Label } from "@/components/ui/label"

export function ShowImages({name,img}:{name:string,img:string}) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        {/* <Button variant="outline">Hello{name}</Button> */}
       <p className="text-blue-400">{name}</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-slate-300 bg-body">
        <DialogHeader>
          <DialogTitle>Showing Image</DialogTitle>
          <DialogDescription>
            <p className="text-sm text-muted-foreground">
              {name}
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            {/* {JSON.stringify({data:img,alt:"hello"})} */}
        <Image src={img} alt="img" width={200} quality={90} height={200} className="w-full rounded-md h-full" />
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
