
"use client"
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
import { Label } from "@/components/ui/label"
import { createDirectory } from "@/serverActions/files"
import { CustomSession, authOption } from "@/utils/authOptions"
import { Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useToast } from "./ui/use-toast"
import React from "react"
import { set } from "mongoose"

export function NewFolder({title}:{title:string}) {
  const {toast} = useToast();
  const session = useSession();
  const [isCreating,setIsCreating] = React.useState(false);
  const [isCreated,setIsCreated] = React.useState(false);

  if(!session.data?.user){
    return null;
  } 

  const handleOnCreateDir = async(formData:FormData)=>{
    console.log(session.data ,formData.get("name"));
  if(!session.data?.user || !formData.get("name")){
    toast({
      title: "Error",
      description: "You are loggedOut or Title is empty!",
      variant: "destructive",
    })
    return;
  }

  toast({
    title: "Your directory is being created..",
    description: "Please wait!",
    duration: 5000,
  })

  setIsCreating(true);


    const createDir = await createDirectory(`${(session.data as unknown as CustomSession).accessToken}`,"rdserver",`${(session.data as unknown as CustomSession).login}`,`${formData.get("name")}`);
    console.log(createDir);
    if(createDir){
      toast({
        title: "Directory Created",
        description: "Your new directory has been created",
    
      })
    
      setIsCreated(true);
    }else{
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      })

    }

    setIsCreating(false);
    //close the dialog
    

    
  }

  

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Typography className="text-red-500">{title.charAt(0).toUpperCase()}{title.slice(1).toLowerCase()}</Typography>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-body text-slate-200">
        <DialogHeader>
          <DialogTitle>Create New Directory</DialogTitle>
          <DialogDescription>
            Give a suitable name to your new directory.
          </DialogDescription>
        </DialogHeader>
        
        <form action={handleOnCreateDir}>

        <div className="grid gap-4 py-4">
          <div className="grid  items-center gap-4">
         
          {isCreated ? <Typography>Directory Created,Refresh the page...</Typography> :  <Input
              id="name"
              name="name"
              defaultValue="Your Directory Name"
              className="col-span-3 bg-transparent"
              />}
          </div>
         
        </div>
        <DialogFooter>
          {isCreated? null : isCreating ? 
          <Button disabled>Creating...</Button>
          :<Button type="submit">Create</Button>}
        
        </DialogFooter>
              </form>
      </DialogContent>
    </Dialog>
  )
}
