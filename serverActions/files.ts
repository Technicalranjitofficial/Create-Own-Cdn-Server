"use server";

import { showError } from "@/ErrorHandling/error";
import connectDB from "@/db/dt";
import { IRequestFiles } from "@/interfaces/files";
import FileModel, { IFile } from "@/models/files.model";
import User from "@/models/users.model";
import axios from "axios";
import { cache } from "react";

//uploading files to mongodb and github

let token =
  "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";


export const getAllFiles = async (userId: string) => {
  try {
    await connectDB();
    const files = await FileModel.find({ Uploader: userId });
    return JSON.stringify({
      message: "Files found",
      success: true,
      data: files,
    });
  } catch (error: any) {
    return showError(error.message, false);
  }
};

export const getAllGithubRepos = async (AccessTone: string) => {
  try {
    const url = "https://api.github.com/user/repos";
    const headers = {
      Authorization: "token " + AccessTone,
    };
    const response = await axios.get(url, { headers });
    return JSON.stringify({
      message: "Files found",
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    return showError(error.message, false);
  }
};

//create a base directory or repos in github
// export const initializeBaseRepos = async(AccessToken:string,repoName:string)=>{
//     console.log(AccessToken,repoName);
//     try {
//         const url = "https://api.github.com/user/repos";
//         const headers = {
//             Authorization: "token " + AccessToken
//         };
//         const data = {
//             name:repoName,
//             description:"This is the base direcory of your cdn file where you will upload your files",
//             homepage:"https://github.com",
//             private:false,
//         }
//         const response = await axios.post(url,data, { headers });
//         return JSON.stringify({message:"Base Directory Created Successfullt",success:true,data:response.data});
//     } catch (error:any) {
//         console.log(error);
//         return showError(error.message,false);
//     }
// }

//check if the repos exist or not
// const checkReposExist = async (
//   reposName: string,
//   AccessToken: string,
//   username: string
// ) => {
//   try {
//     // Check if the repository exists by making a GET request
//     const response = await axios.get(
//       `https://api.github.com/repos/${username}/${reposName}`,
//       {
//         headers: {
//           Authorization: `Bearer ${AccessToken}`,
//         },
//       }
//     );

//     // If the repository exists, log a message and return
//     console.log("Repository already exists:", response.data);
//     return { success: true, data: response.data };
//   } catch (error: any) {
//     if (error.response && error.response.status === 404) {
//       // If the response status is 404, the repository does not exist, so create it
//       return {success:false};
//     }
//   }
// };

//get accoutn info

export const getAccountInfo = async (AccessToken: string) => {
  try {
    const config = {
      headers: {
        'Authorization': `token ${AccessToken}`,
      },
    };
    
    axios.get('https://api.github.com/user', config)
      .then(response => {
        // Handle the response, which contains the user's account information
        const accountInfo = response.data;
        console.log('GitHub Account Info:', accountInfo);

      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
    
  } catch (error) {
    console.log(error);
  }
}



async function checkRepositoryExists(owner:string, repo:string,AccessToken:string) {
  try {
    const headers = {
      Authorization: "token " + AccessToken,
    };
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`,{headers});
    

    // If the repository exists, response.status will be 200
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error:any) {
    return false;
  }
}



export const getReposData =  async (
  AccessToken: string,
  repoName: string,
  username: string
) => {
  try {
    console.log(AccessToken,repoName,username);
    let arr = [];
    const url = `https://api.github.com/repos/${username}/${repoName}/contents`;
    const headers = {
      Authorization: "token " + AccessToken,
    };

    const response = await axios.get(url,{headers}) ;
    console.log(response.data)

    for (let index = 0; index < response.data.length; index++) {
        const element:IRequestFiles = response.data[index];
        if(element.type=="dir"){
            arr.push(element as IRequestFiles);
        }  
    }

    

    return {
      message: "Files found",
      success: true,
      data: arr as IRequestFiles[],
    }
  } catch (error: any) {
    console.log(error);
    return {success:false,message:error.message}
  }
};


export const initializeBaseRepos = async (
  AccessToken: string,
  repoName: string,
  username: string
) => {
  try {
    console.log(AccessToken,repoName,username);
    const checkEs = await checkRepositoryExists(username,repoName,AccessToken);
    // const d = await  checkExist(AccessToken,repoName, username);
    console.log("succe",checkEs);

    if(checkEs){
      const data = await getReposData(AccessToken,repoName,username);

      console.log(data);
      if(data.success){
        return JSON.stringify({
          message: "Base Directory Exist",
          success: true,
          data: data.data as IRequestFiles[],
        });
      }else{
        return  JSON.stringify({
          message: "Create New Folder",
          success: true,
          data:[]
         
        });
      }
    }


    // if (d?.success) {
    //  return JSON.stringify({
    //     message: "Base Directory Exist",
    //     success: true,
    //     data: d.data as IRequestFiles[],
    //   });
    // }

    const repoData = {
      name: repoName, // Change this to the desired repo name
      // Set to true for a private repo, false for public
    };
    const response = await axios.post(
      "https://api.github.com/user/repos",
      repoData,
      {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      }
    );

    console.log("Repository created:", response.data);

    return JSON.stringify({
      message: "Base Directory Created Successfullt",
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    console.log(error);
    return showError("Failed to Initialize the base Directory", false);
  }
};

//upload files to github
export const UploadFilesToGithub = async (
  AccessToken: string,
  folderName: string,
  username: string,
  fileName: string,
  fileData: string
) => {
  try {
    const url = `https://api.github.com/repos/${username}/rdserver/contents/${folderName}/${fileName}`;
    const datas = {
      message: "upload image",
      content: fileData,
    };
    const headers = {
      Authorization: "token " + AccessToken,
    };

    const response = await axios.put(url, datas, {
      headers,
      onUploadProgress: (progressEvent: any) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        console.log(progress);
      },
    });
    console.log(response.data.content.download_url);
    // return response.data.content.download_url;
    console.log(response.data.content);
    return JSON.stringify({
      message: "File uploaded successfully",
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createDirectory = async (
  accessToken: string,
  repoName: string,
  repoOwner: string,
  directoryPath: string
) => {
  try {
    console.log(accessToken, repoName, repoOwner, directoryPath);
    // Create a new file in the empty directory (this will force GitHub to create the directory)
    const createFileResponse = await axios.put(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${directoryPath}/.gitkeep`,
      {
        message: "Create empty directory",
        content: Buffer.from("").toString("base64"), // Empty content
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if(!createFileResponse.data.content){
        return false;
    }

    console.log("Empty directory created successfully.");

    return true;
  } catch (error: any) {
    console.error(
      "Error creating empty directory:",
      error.response?.data || error.message
    );
    return false;
  }
};


// export const revalidate = 3600 // revalidate the data at most every hour
// get all files from github by name


export const getFolderContent = cache(async (
    AccessToken: string,
    repoName: string,
    username: string,
    folderName:string
  ) => {
    try {
      let arr = [];
      const url = `https://api.github.com/repos/${username}/${repoName}/contents/${folderName}`;
      const headers = {
        Authorization: "token " + AccessToken,
      };
      const response = await axios.get(url, { headers }) ;
  
    //   for (let index = 0; index < response.data.length; index++) {
    //       const element:IRequestFiles = response.data[index];
    //       if(element.type=="dir"){
    //           arr.push(element as IRequestFiles);
    //       }  
    //   }
  
      
  
      return JSON.stringify({
        message: "Files found",
        success: true,
        data: response.data as IRequestFiles[],
      });
    } catch (error: any) {
      console.log(error);
      return showError(error.message, false);
    }
  });

//deleting a file
export const deleteFileFromGithub = async (
  AccessToken: string,
  repoName: string,
  username: string,
  fileName: string
) => {
  try {
    const url = `https://api.github.com/repos/${username}/${repoName}/contents/surya/${fileName}`;
    const headers = {
      Authorization: "token " + AccessToken,
    };
    const response = await axios.delete(url, { headers });
    return JSON.stringify({
      message: "File deleted successfully",
      success: true,
      data: response.data as IFile,
    });
  } catch (error: any) {
    return showError(error.message, false);
  }
};


//get all files from a repos 