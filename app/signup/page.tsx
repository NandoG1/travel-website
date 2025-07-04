"use client"
import Input from '@/ui/input'
import Image from 'next/image'
import React, { useState } from 'react'
import Dubai from "@/public/dubai.jpg"
import { Button } from '@/ui/button'
import schema from './schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import AXIOS_API from '@/utils/axiosAPI'
import Toast from '@/utils/toast'
import toast from 'react-hot-toast'
import Link from 'next/link'

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const {register, handleSubmit, formState:{errors}}:any = useForm({resolver: zodResolver(schema)})

  const router = useRouter()
  const onSubmit = async(data:any) => {
    setIsLoading(true);
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
      toast.error("Something went wrong. Please try again.");
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4'>
      {/* Background Image Container */}
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          className='w-full h-full object-cover opacity-80'
          src={Dubai}
          alt="Travel destination"
        />
        <div className='absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20'></div>
      </div>

      <div className='relative z-10 w-full max-w-md'>
        <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden'>
          <div className='bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6 text-center'>
            <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            <h1 className='text-2xl font-bold text-white mb-1'>Join Our Community</h1>
            <p className='text-orange-100 text-sm'>Create your account and start exploring</p>
          </div>

          <div className='p-8'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Username
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                  </div>
                  <input
                    {...register("username")}
                    type="text"
                    placeholder='John'
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  />
                </div>
                {errors.username && (
                  <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>
                )}
              </div>

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
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
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
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  />
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                )}
              </div>

              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='terms'
                    name='terms'
                    type='checkbox'
                    className='h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded'
                    required
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='terms' className='text-gray-700'>
                    I agree to the{' '}
                    <Link href='/terms' className='text-orange-600 hover:text-orange-500 font-medium'>
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href='/privacy' className='text-orange-600 hover:text-orange-500 font-medium'>
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <Button 
                disabled={isLoading} 
                type='submit'
                className='w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              >
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>


            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>Or sign up with</span>
                </div>
              </div>
            </div>



            <div className='mt-6 text-center'>
              <p className='text-sm text-gray-600'>
                Already have an account?{' '}
                <Link href='/login' className='font-medium text-orange-600 hover:text-orange-500 transition-colors'>
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp