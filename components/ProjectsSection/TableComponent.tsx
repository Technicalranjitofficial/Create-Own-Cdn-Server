import { IRequestFiles } from '@/interfaces/files';
import { getFolderContent } from '@/serverActions/files';
import { CustomSession, authOption } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'
import { DataTableDemo } from './Table';

const TableComponent = async({params}:{params:any}) => {
    const session  = await getServerSession(authOption);
    console.log(session);
    if(!session){
        return <h1 className='text-white text-center'>Please Refresh</h1>;
    }
    const getData = await getFolderContent((session as unknown as CustomSession).accessToken as string,"rdserver",(session as unknown as CustomSession).login as string,params.projectName);
console.log(getData);
    const decode:{
        data:IRequestFiles[]
    } = JSON.parse(getData);
  return (
    <div>
       {decode.data && <DataTableDemo folder={params.projectName} data={decode.data} />}
    </div>
  )
}

export default TableComponent
