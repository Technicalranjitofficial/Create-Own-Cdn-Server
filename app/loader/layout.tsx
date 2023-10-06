import { ReactNode, Suspense } from "react";
// import Loading from "./loading";

export default async function Layout({children}:{children:ReactNode}){

    // const p:string = await new Promise((resolve)=>{
    //     setTimeout(() => {
    //         resolve("man")
    //     }, 4000);
    // })

    return <div className="text-white">
        I am here
        {children}
    </div>
}