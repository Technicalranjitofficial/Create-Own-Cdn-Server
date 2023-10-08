
import axios from "axios";
import { Session } from "inspector";
import { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
export interface CustomSession extends Session {
    accessToken?: string;
    login?:string;
}
export const authOption:NextAuthOptions={
    providers:[
        
         GithubProvider({
            clientId:process.env.GITHUB_CLIENT!,
            clientSecret:process.env.GITHUB_SECRET!,
            authorization:{params:{scope:"repo"}}
            
          
              
         }),
         
    ],
   
    secret:process.env.SECRET!,
   
   
    jwt:{
        secret:process.env.SECRET!,
    },
    callbacks: {
        async jwt({ token, account }) {
          // Persist the OAuth access_token to the token right after signin
          if (account) {
            console.log("acc",account);
            token.accessToken = account.access_token
            const config = {
              headers: {
                'Authorization': `token ${account.access_token}`,
              },
            };
            
           const user = await axios.get('https://api.github.com/user', config);
             
            token.login = user.data.login;
          }
          return token
        },
        async session({ session, token, user }) {
          console.log("sess",session,token);

          // Send properties to the client, like an access_token from a provider.
          (session as unknown as CustomSession).accessToken = `${token.accessToken}`;
          (session as unknown as CustomSession).login = `${token.login}`;
          return session
        }
      }
      
    
}