"use client"
import React, { useState } from 'react'
import Paris from "@/public/paris.jpg"
import Image from 'next/image'
import { Button } from '@/ui/button'
import { useFormState } from 'react-dom'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { schema } from './schema'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Oval } from "react-loader-spinner"
import Link from 'next/link'

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register, handleSubmit, formState: {errors}
  }:any = useForm({resolver: zodResolver(schema)})

  const onSubmit = async(data:any) => {
    if(Object.keys(errors)?.length > 0){
      toast.error("Enter valid data")
      return
    }

    setIsLoading(true);

    try{
      const res = await signIn("credentials", {...data, redirect:false});

      if(res?.error === null){
        router.push("/")
      }
      else{
        toast.error("Email or passsword is invalid")
      }
    }
    catch(error){
      console.log(error)
    }

    setIsLoading(false);
  }
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          className='w-full h-full object-cover opacity-80'
          src={Paris}
          alt="Travel destination"
        />
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20'></div>
      </div>

      <div className='relative z-10 w-full max-w-md'>
        <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center'>
            <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h1 className='text-2xl font-bold text-white mb-1'>Welcome Back</h1>
            <p className='text-blue-100 text-sm'>Sign in to continue your journey</p>
          </div>

          <div className='p-8'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Email Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                    </svg>
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder='john@example.com'
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  />
                </div>
                {errors.email && (
                  <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                    </svg>
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder='••••••••'
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  />
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                )}
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                  <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                    Remember me
                  </label>
                </div>
                <Link href='/login' className='text-sm text-blue-600 hover:text-blue-500 transition-colors'>
                  Type your password
                </Link>
              </div>

              <Button 
                disabled={isLoading} 
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              >
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <Oval height={20} width={20} color="#ffffff" />
                    <span className='ml-2'>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                </div>
              </div>
            </div>

            <div className='mt-6 text-center'>
              <p className='text-sm text-gray-600'>
                Don't have an account?{' '}
                <Link href='/signup' className='font-medium text-blue-600 hover:text-blue-500 transition-colors'>
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-500'>
            By signing in, you agree to our{' '}
            <Link href='/login' className='text-blue-600 hover:text-blue-500'>Terms of Service</Link>
            {' '}and{' '}
            <Link href='/login' className='text-blue-600 hover:text-blue-500'>Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login