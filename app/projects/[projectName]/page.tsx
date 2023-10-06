
import  { DataTableDemo } from '@/components/ProjectsSection/Table';
import { CustomSession, authOption } from '@/utils/authOptions';
import { IRequestFiles } from '@/interfaces/files';
import { getAllFilesFromGithub, getFolderContent } from '@/serverActions/files'
import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react'
import TableComponent from '@/components/ProjectsSection/TableComponent';
// type Props = {
//     params: {};
//     searchParams: { [key: string]: string | string[] | undefined };
//   };

const page = async({params}:{params:{projectName:string}}) => {
  return (
    <div className=''>
   
   <Suspense fallback={<h1 className='text-white'>Loading Table</h1>}>
    <TableComponent params={params}/>
   </Suspense>

    {/* {decode.data && <EnhancedTable />} */}
    </div>
  )
}

export default page
