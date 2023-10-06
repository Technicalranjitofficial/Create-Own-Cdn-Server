"use client"
import { IRequestFiles } from '@/interfaces/files'
import { IFile } from '@/models/files.model'
import Link from 'next/link'
import React from 'react'
import { AiFillFolder, AiOutlineMenu } from 'react-icons/ai'
import {CiMenuKebab} from "react-icons/ci"
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { PopUpMenu } from '../PopUpMenu'

const FolderCards = ({data}:{data:IRequestFiles[]}) => {
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mb-20 gap-5 p-3'>
      {data.map((file,index)=>{
        return <Link key={index} href={`/projects/${file.name}`}> <div className='h-auto rounded-md text-slate-200 flex justify-between items-center w-full bg-transparent border border-gray-700 p-2 mt-5'>
           <div className='flex flex-row justify-center items-center gap-2'>
            <AiFillFolder  className="w-10 h-10 text-slate-300"/>
            <span >{file.name}</span>
           </div>
          <PopUpMenu/>
           {/* <button onClick={()=>console.log("hello Guys")}></button> */}
        </div>
        </Link>
      })}

      
    </div>
  )
}

export default FolderCards
