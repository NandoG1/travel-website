import Link from 'next/link'
import React from 'react'
import Image from "next/image"

interface CardProps {
  place: {
    image: string;
    city: string;
    numOfPlace: number;
  }
}

function Card({place}: CardProps) {
  return (
    <Link href="/catalog" className='cursor-pointer h-[500px] w-[350px] flex flex-col flex-warp rounded-xl shadow-md'>
        <div className='relative h-2/3 w-full'>
            <Image src={place.image} alt='' fill className='h-full w-full overflow-hidden rounded-tl-xl rounded-tr-xl object-cover'
            />
            <div className='absolute right-0 bottom-0 p-4 bg-blue-700 text-white rounded-tl-xl font-semibold'>
                {place.city}
            </div>
        </div>
        <div className='flex flex-col gap-4 p-4'>
            <h2 className='text-center text-2xl text-slate-800 font-semibold'> 
                {place.numOfPlace} Place to stay
            </h2>
            <p className='text-center mt-2 text-lg text-slate-700'>
                Discover the best hotel or apartement for your adventurous journey.
            </p>
        </div>
    </Link>
  )
}

export default Card