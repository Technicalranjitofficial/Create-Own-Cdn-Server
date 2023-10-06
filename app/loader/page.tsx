import React, { Suspense } from 'react'

const page = async() => {

    const p:string = await new Promise((resolve)=>{
        setTimeout(() => {
            resolve("Hi")
        }, 4000);
    })

  return (
    <div>
      Hello Guys 
      <Suspense fallback={<h1>Hey Guys Whats Up</h1>}>
        {p}
      </Suspense>


    </div>
  )
}

export default page
