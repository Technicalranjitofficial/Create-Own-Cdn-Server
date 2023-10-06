"use client"
import { LoginUser, logoutUser } from '@/serverActions/user.actions'
import { signIn } from 'next-auth/react'
import React from 'react'

const page = async() => {

    // const user = await LoginUser('suman@gmail.com');
    
  return (
    <div>
        {/* {user && <h1>Hello Guys</h1> } */}
      
      <button onClick={()=>LoginUser("suman@gmail.com")}>Login</button>
      <br />
      <button onClick={()=>logoutUser()}>Logout</button>
      <br />
      <br />
      <button onClick={()=>signIn("github",{scope:"repo"})}>SignIn with Github</button>
    </div>
  )
}

export default page
