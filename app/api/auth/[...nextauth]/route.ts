import {PrismaAdapter} from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import db from "@/lib/db"

export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials:any){
                const {email, password} = credentials

                const user = await db.user.findUnique({
                    where: {
                        email
                    }
                })

                if(!user){
                    throw new Error("Invalid Input")
                }

                const isCorrectPass = await bcrypt.compare(password, user.password)

                if(!isCorrectPass){
                    throw new Error("Invalid Input")
                }
                else{
                    const {password, ...currentUser} = user

                    return currentUser
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as const
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        jwt({token, user}: any){
            if(user) token.isAdmin = user.isAdmin
            return token
        },
        session({session, token}:any){
            session.user.isAdmin = token.isAdmin
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}