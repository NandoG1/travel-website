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
    <Link href="/catalog" className='cursor-pointer h-[500px] w-[350px] flex flex-warp rounded-xl shadow-md'>
        <div className='relative h-2/3 w-full'>
            <Image src={place.image} alt='' fill className='h-full w-full overflow-hidden rounded-tl-xl rounded-tr-xl object-cover'
            />
            <div className='absolute right-0 bottom-0 p-4 bg-blue-700 text-white rounded-tl-xl font-semibold'>
                {place.city}
            </div>
        </div>
    </Link>
  )
}

export default Card