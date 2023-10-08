"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadFilesToGithub, createDirectory } from "@/serverActions/files";
import { CustomSession, authOption } from "@/utils/authOptions";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import React from "react";
import { set } from "mongoose";

export function UploadFilesData({folder}:{folder:string}) {
  const { toast } = useToast();
  const session = useSession();
  const [isCreating, setIsCreating] = React.useState(false);
  const [isCreated, setIsCreated] = React.useState(false);

  if (!session.data?.user) {
    return null;
  }




  const handleOnCreateDir = async (formData: FormData) => {
    // console.log(session.data, formData.get("name"));
    if (!session.data?.user || !formData.get('file')) {
      toast({
        title: "Error",
        description: "You are logged out! or File is empty!",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Your file is being Uploaded..",
      description: "Please wait!",
      duration: 5000,
    });

    setIsCreating(true);

    const file = formData.get('file');
    console.log(file);
    //connverting file to base64 for uploading to github

    //get file name
    const fileName = Date.now()+"_"+(file as File).name
//get the file 

    //encoding file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = async function () {
      const base64Data = reader.result?.toString().split(',')[1]
      
      const upload = await UploadFilesToGithub(`${(session.data as unknown as CustomSession).accessToken}`,folder,`${(session.data as unknown as CustomSession).login}`,fileName,base64Data as string);
      if (upload) {
        toast({
          title: "Success!",
          description: "File Uploaded Successfully..",
        });
  
        setIsCreated(true);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      }
      setIsCreating(false);
  
    };
      
    
    //close the dialog
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload New Files</Button>
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
              {isCreated ? (
                <Typography>
                  File Uploaded Successfully,Refresh the page...
                </Typography>
              ) : (
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Upload file
                  </label>
                  <input

                    className="block w-full text-sm text-gray-300 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none bg-transparent "
                    id="file_input"
                    name="file"
                    type="file"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            {isCreated ? null : isCreating ? (
             <Typography>Please Wait while Creating...</Typography>
            ) : (
              <Button type="submit">Create</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
