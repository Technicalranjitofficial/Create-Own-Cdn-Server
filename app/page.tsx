"use client"
import { uploadFiles } from '@/serverActions/files'
import Image from 'next/image'
export default function Home() {
  const upload = (formData:FormData)=>{
    const file = formData.get('file');
    console.log(file);
    //connverting file to base64 for uploading to github

    //encoding file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = function () {
      const base64Data = reader.result?.toString().split(',')[1]
      // uploadFiles(base64Data as string,"TestImage.jpg",);
    };

  }
  return (
   <>
  </>
  )
}
