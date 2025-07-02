"use client"
import Input from '@/ui/input'
import Image from 'next/image'
import React from 'react'
import Dubai from "@/public/dubai.jpg"
import { Button } from '@/ui/button'
import schema from './schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import AXIOS_API from '@/utils/axiosAPI'
import Toast from '@/utils/toast'
import toast from 'react-hot-toast'

function SignUp() {

  const {register, handleSubmit, formState:{errors}}:any = useForm({resolver: zodResolver(schema)})

  const router = useRouter()
  const onSubmit = async(data:any) => {
    try{
      console.log("hei");
      await AXIOS_API.post("/register", data);

      toast.success("Success! Redirecting to Login!");

      window.setTimeout(() => {
        router.push("/login")
      }, 250);
      
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className='relative h-screen w-full'>
      <div className='relative h-full w-full'>
        <Image src={Dubai} className='brightness-50 h-full w-full object-cover' alt=''/>
        <div className='h-[450px] w-[400px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg'>
          <h2 className='text-center p-4 font-semibold text-slate-800 text-2xl border border-slate-500'>
            Create an account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} action="" className='mt-12 flex flex-col items-center w-full gap-8'>
            <input className="w mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600" type="text" placeholder="John" {...register("username")}/>
            <input className="w mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600" type="email" placeholder="John@gmail.com" {...register("email")} />
            <input className="w mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600" type="password" placeholder="John123" {...register("password")} />
            <button type='submit' className='w-3/4 mt-12 cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600 flex items-center justify-center'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp