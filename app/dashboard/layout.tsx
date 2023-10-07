import ProjectsHeader from "@/components/ProjectsSection/ProjectsHeader";
import { CustomSession, authOption } from "@/utils/authOptions";
import { IRequestFiles } from "@/interfaces/files";
import { IFile } from "@/models/files.model";
import { getServerSession } from "next-auth";
import { ReactNode, Suspense } from "react";
import Loader from "@/components/Loader";


export default async function Layout({children}:{children:ReactNode}){


    // const t:string  = await new Promise((resolve,reject)=>{
    //     setTimeout(()=>{
    //         resolve("hello");
    //     },2000)
    // }
    // )
    
    
  

    return <div className="max-w-screen overflow-y-auto">
        {/* <ProjectsHeader data={}/> */}

        <h1 className=' pt-10 pl-3 md:pl-2 text-xl text-white '>Projects</h1>
        <Suspense fallback={ <div className="w-full flex justify-center pb-10 text-slate-300 items-center flex-col gap-5">
            <Loader />
            <h1>Folders Loading...</h1>
        </div>  }>
            <ProjectsHeader/>
            </Suspense>

      <div>

      {children}
      </div>


        
    </div>
}