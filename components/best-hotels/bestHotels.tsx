import React from 'react'
import image_1 from '@/public/hr_1.jpg'
import image_2 from '@/public/hr_2.jpg'
import image_3 from '@/public/hr_3.jpg'
import image_4 from '@/public/hr_4.jpg'
import image_5 from '@/public/hr_5.jpg'
import image_6 from '@/public/hr_6.jpg'
import image_7 from '@/public/hr_7.jpg'
import Card from './card'

interface HotelsProps{
  name: string,
  image: string,
  price: number,
  category: string,
  reviews: number,
  location: string
}

const BestHotels = () => {
   const data: HotelsProps[] = [
    {
      name: "Arabian Paradise",
      image: image_1.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_2.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_3.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_4.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_5.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_6.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_7.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
  ]

  return (
    <div className='h-full w-full my-36'>
      <div className='h-full w-5/6 mx-auto flex flex-col justify-start'>
        <h5 className='text-[20px] bg-blue-500 text-white rounded-full p-4 w-max'>
          Explore Top
        </h5>
        <h2 className='text-4xl text-slate-800 font-bold mt-6 mb-12'>
          Best Hotels
        </h2>
        <div className='flex flex-wrap items-center gap-14'>
          {data?.map((place, idx) => (
            <Card key={idx} place={place}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BestHotels