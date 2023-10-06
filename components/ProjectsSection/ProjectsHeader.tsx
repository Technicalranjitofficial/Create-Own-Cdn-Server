import React from 'react'
import FolderCards from './FolderCards'
import { IFile } from '@/models/files.model'
import { IRequestFiles } from '@/interfaces/files'
import { getServerSession } from 'next-auth'
import { CustomSession, authOption } from '@/utils/authOptions'
import { getAllFilesFromGithub } from '@/serverActions/files'

const ProjectsHeader = async() => {


  const session  = await getServerSession(authOption);
  console.log(session);
  if(!session){
      return <h1>Please Login</h1>;
  }
  const getData = await getAllFilesFromGithub((session as unknown as CustomSession).accessToken as string,"rdserver",session.user?.name as string);

  const decode:{
      data:IRequestFiles[]
  } = JSON.parse(getData);

  return (
    <div className='w-full max-h-screen pb-5'>
      
       {decode.data &&  <FolderCards data={decode.data}/>}
    </div>
  )
}

export default ProjectsHeader
