import ImagePreview from '@/components/Image';
import { getAllFiles } from '@/serverActions/files';
import { cookies } from 'next/headers';
import Image from 'next/image';
import React from 'react'

const page =async () => {

    const cookieStore = cookies();
    const cookie = cookieStore.get('user');
    console.log(cookie);
    if(!cookie){
        return <div>Not Logged In</div>
    }

    const data = JSON.parse(cookie.value);
    console.log(data);
    const files = await getAllFiles(data._id);

    const decodeFile = JSON.parse(files);
    console.log(decodeFile);


  return (
    <div>
      {decodeFile && decodeFile.data.map((file:any,index:number)=>{
        return <div key={index}>
          <ImagePreview Url={file.Url} name={file.name}/>
          <h1>{file.name}</h1>
        </div>
      })}
    </div>
  )
}

export default page
