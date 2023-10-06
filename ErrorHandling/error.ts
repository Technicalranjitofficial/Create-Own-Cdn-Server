"use server"

export const showError = (message:string,success:boolean)=>{
    return JSON.stringify({message:message,success:success});
}