
import  { DataTableDemo } from '@/components/ProjectsSection/Table';
import { CustomSession, authOption } from '@/utils/authOptions';
import { IRequestFiles } from '@/interfaces/files';
import {  getFolderContent } from '@/serverActions/files'
import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react'
import TableComponent from '@/components/ProjectsSection/TableComponent';
import Loader from '@/components/Loader';
// type Props = {
//     params: {};
//     searchParams: { [key: string]: string | string[] | undefined };
//   };

const page = async({params}:{params:{projectName:string}}) => {
  return (
    <div className=''>
   
   <Suspense fallback={<div className="w-full flex justify-center items-center text-slate-300 flex-col gap-5">
            <Loader />
            <h1>Files Loading...</h1>
        </div>}>
    <TableComponent  params={params}/>
   </Suspense>

    {/* {decode.data && <EnhancedTable />} */}
    </div>
  )
}

export default page
