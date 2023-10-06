import UploadFiles from '@/components/UploadFile';
import { cookies } from 'next/headers'
import React from 'react'

const page = () => {

    const cookieStore = cookies();
    const cookie = cookieStore.get('user');
    if(!cookie){
        return <div>Not Logged In</div>
    }

    const data = JSON.parse(cookie.value);
    console.log(data);

  return <UploadFiles userId={data._id}/>
}

export default page
