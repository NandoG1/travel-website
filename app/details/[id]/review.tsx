import React from 'react'
import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { format } from 'date-fns'

function Review({review}:any) {
  return (
    <div className='bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200'>
        <div className='flex items-start gap-4'>
            <div className='w-12 h-12 flex-shrink-0 bg-gray-200 rounded-full border-2 border-gray-200 flex items-center justify-center'>
                <FaUser className='text-gray-500' size={20} />
            </div>
            <div className='flex-1'>
                <div className='flex items-center justify-between mb-2'>
                    <div>
                        <h3 className='font-semibold text-lg text-gray-900'>John Doe</h3>
                        <span className='text-sm text-gray-500'>
                            {format(review.createdAt, "MMM do, yyyy")}
                        </span>
                    </div>
                    <div className='flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full'>
                        <span className='font-semibold text-blue-600'>{review.stars}</span>
                        <AiFillStar size={16} color='rgb(59,130,246)'/>
                    </div>
                </div>
                <div className='text-gray-700 leading-relaxed'>
                    {review.text}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Review