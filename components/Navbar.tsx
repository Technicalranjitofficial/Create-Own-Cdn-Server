import Image from 'next/image'
import React from 'react'
import { AiOutlineCloudUpload, AiOutlineSearch, AiOutlineUpload } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between px-2 pt-5'>
        <div className='flex justify-center gap-2 items-center  border border-slate-700 rounded-md px-3'>
        <AiOutlineSearch/>    
        <input className='bg-transparent outline-none'  type="text" />
        </div>
        <div className='flex justify-around items-center gap-5 pr-5'>
           <div className='flex justify-center gap-2 items-center border border-slate-600 bg-blue-600 text-white px-3 py-1 rounded-md'>
           <AiOutlineCloudUpload className="w-5 h-5"/>
           <button className=''>Upload Files</button>
           </div>
            <div>
                <Image width={50} height={50} src="/favicon.ico" alt="" />
            </div>
        </div>

    </div>
  )
}

export default Navbar
