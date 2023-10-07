import React from 'react'
import FolderCards from './FolderCards'
import { IFile } from '@/models/files.model'
import { IRequestFiles } from '@/interfaces/files'
import { getServerSession } from 'next-auth'
import { CustomSession, authOption } from '@/utils/authOptions'
import DisplayMessage from '../DisplayMessage'
import { initializeBaseRepos } from '@/serverActions/files'

const ProjectsHeader = async() => {


  const session  = await getServerSession(authOption);
  console.log(session);
  if(!session){
      return <h1>Please Login</h1>;
  }
  const getData = await initializeBaseRepos((session as unknown as CustomSession).accessToken as string,"rdserver",session.user?.name as string);

  const decode:{
      data:IRequestFiles[],
      success:boolean,
      message:string
  } = JSON.parse(getData);

  if(decode.success && decode.data.length<1){
    return <div className='w-full flex justify-center items-center'><h1>Please Create Your First Folder..</h1></div>
  }

  return (
    <div className='w-full h-auto pb-2'>
      
      <DisplayMessage success={decode.success} message={decode.message}/>
       {decode.data &&  <FolderCards data={decode.data}/>}
    </div>
  )
}

export default ProjectsHeader
