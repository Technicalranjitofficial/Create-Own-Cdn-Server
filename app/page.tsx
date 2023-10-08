

import MainLayout from '@/components/MainLayout'
import { getAccountInfo } from '@/serverActions/files'
import { CustomSession, authOption } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
export default async function Home() {
  



  
  return (
   <>

   <div className='text-white gap-3 flex justify-center items-center flex-col'>
   <h1 className='text-center text-3xl mt-10 font-bold'>Create Your Own <span className='text-cyan-500'>CDN SERVER</span></h1>
      <span className='text-slate-300 text-center'>Manage your Image assets to your own cdn server Using Github.<br/>Here is the small documentation.</span>
   </div>
   
   <MainLayout title='Create a Github Account' subTitle='You can create your separete github account rather than using main account' img='https://raw.githubusercontent.com/Technicalranjitofficial/rdserver/main/CDN-SERVER/1696744606288_Screenshot%20from%202023-10-08%2011-21-43.png' />

   <MainLayout title='Login This Site' subTitle='After Creating your github account. Just login using that account and accept the permission.' img='https://raw.githubusercontent.com/Technicalranjitofficial/rdserver/main/CDN-SERVER/1696744694211_Screenshot%20from%202023-10-08%2011-23-19.png' />

   <MainLayout title='Its Ready' subTitle='Now You can create folders and inside files' img='https://raw.githubusercontent.com/Technicalranjitofficial/rdserver/main/CDN-SERVER/1696744621479_Screenshot%20from%202023-10-08%2011-25-31.png' />
     {/* creating a note   */}

     <h1 className='pb-28 p-3 text-center text-red-700'>Note : <span className='text-slate-300'> Don&apos;t delete <span className='text-red-500'>rdserver</span> folder from your repository otherwise all your files will be deleted. </span> </h1>
  </>

  )
}
