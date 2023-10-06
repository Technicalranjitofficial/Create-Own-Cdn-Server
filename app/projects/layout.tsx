import ProjectsHeader from "@/components/ProjectsSection/ProjectsHeader";
import { CustomSession, authOption } from "@/utils/authOptions";
import { IRequestFiles } from "@/interfaces/files";
import { IFile } from "@/models/files.model";
import { getAllFilesFromGithub } from "@/serverActions/files";
import { getServerSession } from "next-auth";
import { ReactNode, Suspense } from "react";


export default async function Layout({children}:{children:ReactNode}){


    // const t:string  = await new Promise((resolve,reject)=>{
    //     setTimeout(()=>{
    //         resolve("hello");
    //     },2000)
    // }
    // )
    
    
  

    return <div className="max-w-screen overflow-y-auto">
        {/* <ProjectsHeader data={}/> */}

        <h1 className='pl-4 pt-10 text-xl text-white '>Projects</h1>
        <Suspense fallback={<h1 className="text-white">Loading</h1>}>
            <ProjectsHeader/>
            </Suspense>

      
          {children}

<div>
   hello
</div>
        
    </div>
}