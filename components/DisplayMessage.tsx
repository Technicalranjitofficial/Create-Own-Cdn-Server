"use client"

import React, { useEffect } from 'react'
import { useToast } from './ui/use-toast'

const DisplayMessage = ({message,success}:{message:string,success:boolean}) => {
    const {toast} = useToast();

    useEffect(()=>{
        toast({
            title: success?"Success":"Error",
            description:message,
            duration: 5000,
          })
    },[success])


  return null;
}

export default DisplayMessage
