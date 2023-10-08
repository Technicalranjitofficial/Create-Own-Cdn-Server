import Image from 'next/image'
import React from 'react'

const MainLayout = ({title,subTitle,img}:{
    title:string,
    subTitle:string,
    img:string
}) => {
  return (
    <div className='w-full flex justify-center p-2 items-center flex-col mt-10'>
      <div className='flex text-white flex-col items-center gap-2'>
      <h1 className='text-xl font-bold text-slate-300'>{title}</h1>
        <span className='text-slate-400'>{subTitle}</span>
      </div>
    <Image alt='img' src={img} width={500} height={500} className='w-full p-1 rounded-md md:w-3/4 lg:w-2/4' />
    </div>

  )
}

export default MainLayout
