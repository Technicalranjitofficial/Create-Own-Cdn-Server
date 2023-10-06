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

export const uploadFiles = async (
  data: string,
  imageName: string,
  userId: string
) => {
  try {
    await connectDB();
    //checking user exist
    if (!userId) {
      return JSON.stringify({ message: "User not found", success: false });
    }
    const user = await User.findById(userId);
    if (!user) {
      return JSON.stringify({ message: "User not found", success: false });
    }

    //upload image to github
    const url =
      "https://api.github.com/repos/ranjitdasofficial/api-testing/contents/images/" +
      imageName;
    const datas = {
      message: "upload image",
      content: data,
    };
    const headers = {
      Authorization: "token " + token,
    };
    const response = await axios.put(url, datas, { headers });
    console.log(response.data.content.download_url);
    // return response.data.content.download_url;
    console.log(response.data.content);
    uploadToMongo(
      response.data.content.download_url,
      imageName,
      response.data.content.size,
      userId
    );
  } catch (error) {
    console.log(error);
  }
};

export const uploadToMongo = async (
  url: string,
  imageName: string,
  size: number,
  userId: string
) => {
  try {
    const data = {
      Url: url,
      name: imageName,
      size: size,
      Uploader: userId,
    };
    const upload = await FileModel.create(data);
    console.log(upload);
    // console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

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
const checkReposExist = async (
  reposName: string,
  AccessToken: string,
  username: string
) => {
  try {
    // Check if the repository exists by making a GET request
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${reposName}`,
      {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      }
    );

    // If the repository exists, log a message and return
    console.log("Repository already exists:", response.data);
    return true;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // If the response status is 404, the repository does not exist, so create it
      return false;
    }
  }
};

export const initializeBaseRepos = async (
  AccessToken: string,
  repoName: string,
  username: string
) => {
  try {
    if (await checkReposExist(repoName, AccessToken, username)) {
      console.log("yes");
      return JSON.stringify({
        message: "Repository already exists",
        success: false,
      });
    }

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
    return showError(error.message, false);
  }
};

//upload files to github
export const UploadFilesToGithub = async (
  AccessToken: string,
  repoName: string,
  username: string,
  fileName: string,
  fileData: string
) => {
  try {
    const url = `https://api.github.com/repos/${username}/${repoName}/contents/surya/${fileName}`;
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

    console.log("Empty directory created successfully.");

    return createFileResponse.data;
  } catch (error: any) {
    console.error(
      "Error creating empty directory:",
      error.response?.data || error.message
    );
    return null;
  }
};


// export const revalidate = 3600 // revalidate the data at most every hour
// get all files from github by name
export const getAllFilesFromGithub = cache( async (
  AccessToken: string,
  repoName: string,
  username: string
) => {
  try {
    let arr = [];
    const url = `https://api.github.com/repos/${username}/${repoName}/contents`;
    const headers = {
      Authorization: "token " + AccessToken,
    };
    const response = await axios.get(url, { headers }) ;

    for (let index = 0; index < response.data.length; index++) {
        const element:IRequestFiles = response.data[index];
        if(element.type=="dir"){
            arr.push(element as IRequestFiles);
        }  
    }

    

    return JSON.stringify({
      message: "Files found",
      success: true,
      data: arr as IRequestFiles[],
    });
  } catch (error: any) {
    console.log(error);
    return showError(error.message, false);
  }
});


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