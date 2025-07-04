import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req:any) {
    const token = await getToken({ req })
    const pathname = req.nextUrl.pathname
    const urlOrigin = req.nextUrl.origin 
    // ? change

    if (pathname.includes('/admin') && !token?.isAdmin) {
        return NextResponse.redirect(urlOrigin)
    }

    if(!pathname.includes('/login') && !pathname.includes('/signup') && !token){
        return NextResponse.redirect(urlOrigin + '/login')
    }

    if((pathname.includes('/login') || pathname.includes('/signup')) && token){
          return NextResponse.redirect(urlOrigin)
    } 
    else {
        return NextResponse.next()
    }
}

export const config = {
    matcher: ["/create", "/details/((?!general).*)", "/reservations", "/catalog", "/", "/login", "/signup", "/success-page", "/admin/dashboard", "/admin/users", "/admin/reservations", "/admin/listings"]
}