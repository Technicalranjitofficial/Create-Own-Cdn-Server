import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOption } from './utils/authOptions';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {




// if(token && request.url.includes("/auth/new-user") ){
//     return;
// }

// const token = await getServerSession(authOption);

const token = await getToken({
    req:request,
    secret:process.env.SECRET
})


console.log("token",token)

if(!token){
    return NextResponse.redirect(new URL('/', request.url));
}

return NextResponse.next();
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
   
    '/dashboard/:path*',
   
  ],
}