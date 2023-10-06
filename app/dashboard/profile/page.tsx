"use client"
import UploadToGitHubs from '@/components/UploadToGitHub';
import { CustomSession, authOption } from '@/utils/authOptions';
import { UploadFilesToGithub,createDirectory, getAllFilesFromGithub, getAllGithubRepos, initializeBaseRepos } from '@/serverActions/files';
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react';
import React from 'react'

const page = () => {

    const {data:session}= useSession();
    // const auth =await getServerSession(authOption);
    // console.log(auth);
    console.log(session);
    const accessToken = session && (session as unknown as CustomSession);
    // console.log(session && (session as unknown as CustomSession).accessToken);
  return (
    <div>
      <button onClick={async()=>{
       const data = await getAllGithubRepos(`${accessToken?.accessToken}`);
       const decode = JSON.parse(data);
       console.log(decode);


      }}>Get User Profile</button>
<br />
<br />
{accessToken && <button onClick={async()=>{
    const data = await initializeBaseRepos(`${accessToken?.accessToken}`,"rdserver",session.user?.name as string);
    console.log(data);
}}>Initialize Your Repos </button>}

<br />

{accessToken && <UploadToGitHubs AccessToken={accessToken?.accessToken as string} repoName='rdserver' username={session?.user?.name as string}  />}

<br />
<br />
<button onClick={()=>{
    const data = createDirectory(accessToken?.accessToken as string,"rdserver",session?.user?.name as string,"surya");
}}>Create New Folder</button>

<br />
<br />
<button onClick={async()=>{
    const data = await getAllFilesFromGithub(accessToken?.accessToken as string,"rdserver",session?.user?.name as string);
    console.log(data);
}}>Get All Files</button>
    </div>


  )
}

export default page
