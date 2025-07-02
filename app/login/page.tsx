"use client"
import React, { useState } from 'react'
import Paris from "@/public/paris.jpg"
import Image from 'next/image'
import { Button } from '@/ui/button'

const Login = () => {

  // const {
  //   register, handleSumbit
  // }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  return (
    <div className='relative h-screen w-full'>
      <div className='relative h-full w-full'>
        <Image
          className='brightness-50 h-full w-full object-cover'
          src={Paris}
          alt=""
        />
        <div className='h-[350px] w-[350px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg'>
          <h2 className='text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500'>
            Login into your account
          </h2>
          <form className='mt-8 flex flex-col w-full gap-8'>
            <input
              className='w-1/2 mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600'
              type="email"
              placeholder='John@gmail.com'
            />
            <input
              className='w-1/2 mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600'
              type="password"
              placeholder="********"
            />
            <Button className='mt-8 w-2/3 mx-auto cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600'>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login