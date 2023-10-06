"use client"
import { uploadFiles } from '@/serverActions/files'
import Image from 'next/image'
export default function UploadFiles({userId}:{userId:string}) {
  const upload = (formData:FormData)=>{
    const file = formData.get('file');
    console.log(file);
    //connverting file to base64 for uploading to github

    //get file name
    const fileName = (file as File).name+"_"+Date.now();


    //encoding file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = function () {
      const base64Data = reader.result?.toString().split(',')[1]
      
      uploadFiles(base64Data as string,fileName,userId);
    };

  }
  return (
   <>
   
   <form action={upload}>
   <div className="mb-3">
  <label
    htmlFor="htmlFormFile"
    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
    >Default file input example</label
  >
  <input
    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
    type="file"
    name='file'
    id="htmlFormFile" />
</div>

<button type='submit'>Submit</button>
   </form>
   </>
  )
}
