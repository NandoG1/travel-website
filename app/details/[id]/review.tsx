import React from 'react'
import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'
import person_image from "@/public/bianco_2.png"
import { format } from 'date-fns'

function Review({review}:any) { 
  if (!review) {  
    return (
      <div className='mt-8 text-slate-500'>
        Review not found
      </div>
    )
  }

  return (
    <div className='w-full flex gap-4 p-4 border-b border-slate-200'>
      <div className='w-14 h-14'>
        <Image src={person_image} alt="" className='w-full h-full object-cover rounded-full'/>
      </div>
      <div className='flex-1'>
        <h3 className='font-semibold text-[20px]'>
          {review.user?.name || 'John Doe'}
        </h3>
        <span className='text-slate-700'>
          {review.createdAt ? format(new Date(review.createdAt), "MMM do yyyy") : 'Unknown date'}
        </span>
        <div className='mt-4 text-slate-800'>
          {review.text || 'No comment provided'}
        </div>
      </div>
      <span className='ml-auto flex items-center gap-2'>
        {review.stars || 0}
        <AiFillStar size={22} color='rgb(59,130,246)'/>
      </span>
    </div>
  )
}

export default Review