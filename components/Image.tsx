"use client"
import React from 'react'
import Image from 'next/image'

const ImagePreview = ({Url,name}:{Url:string,name:string}) => {
  return (
    <div>
      <Image src={Url} alt={name} width={100} height={100}/>
    </div>
  )
}

export default ImagePreview
