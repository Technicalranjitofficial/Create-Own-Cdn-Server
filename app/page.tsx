

import { getAccountInfo } from '@/serverActions/files'
import { CustomSession, authOption } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
export default async function Home() {
  // const upload = (formData:FormData)=>{
  //   const file = formData.get('file');
  //   console.log(file);
  //   //connverting file to base64 for uploading to github

  //   //encoding file to base64
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file as Blob);
  //   reader.onload = function () {
  //     const base64Data = reader.result?.toString().split(',')[1]
  //     // uploadFiles(base64Data as string,"TestImage.jpg",);
  //   };

  const session = await getServerSession(authOption);
  if(!session){
    return <h1>Please Login</h1>;
  }



  const p = await getAccountInfo((session as unknown as CustomSession).accessToken as string);

  
  return (
   <>

   Hello
  </>

  )
}
