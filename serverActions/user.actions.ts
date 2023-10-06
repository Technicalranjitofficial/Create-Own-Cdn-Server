"use server"



import { showError } from "@/ErrorHandling/error";
import connectDB from "@/db/dt";
import User from "@/models/users.model";
import { cookies } from "next/headers";

export const registerUser = async(email:string,name:string):Promise<string>=>{
    try {
      await connectDB();
      const user = await User.findOne({email:email});
      if(user){
          return showError("User already exists",false);
      }
      const newUser = await User.create({email:email,name:name});
      if(!newUser){ 
        return showError("User creation failed",false);
      }
      cookies().set("user",JSON.stringify(newUser),{httpOnly:true});
        return JSON.stringify({message:"User created",success:true,data:newUser});
    } catch (error:any) {
       return showError(error.message,false);
    }
}


export const LoginUser = async(email:string):Promise<string>=>{
  try {
    await connectDB();
    const user = await User.findOne({name:email});
    console.log(user,email);
    if(!user){
      return showError("User not found",false);
    }
    cookies().set("user",JSON.stringify(user),{httpOnly:true});
    console.log(user);
    return JSON.stringify({message:"User logged in",success:true,data:user});
  } catch (error:any) {
    console.log(error);
    return showError(error.message,false);
    
  }
}

export const logoutUser = async():Promise<string>=>{
  try {
    cookies().set("user",JSON.stringify({}),{httpOnly:true,expires:Date.now()});
    return JSON.stringify({message:"User logged out",success:true});
  } catch (error:any) {
    return showError(error.message,false);
  }
}