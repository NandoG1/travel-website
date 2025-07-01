"use client"
import React from 'react'
import Image from 'next/image'
import image from "@/public/hr_1.jpg"
import Select from '@/ui/select'
import { optionLocations, optionTypes } from '@/data/data'
import Input from '@/ui/input'
import image_1 from '@/public/hr_1.jpg'
import image_2 from '@/public/hr_2.jpg'
import image_3 from '@/public/hr_3.jpg'
import image_4 from '@/public/hr_4.jpg'
import image_5 from '@/public/hr_5.jpg'
import image_6 from '@/public/hr_6.jpg'
import image_7 from '@/public/hr_7.jpg'
import Card from "@/components/best-hotels/card"

interface HotelsProps{  
  name: string,
  image: string,
  price: number,
  category: string,
  reviews: number,
  location: string
}

function Catalog() {
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
    <div className='min-h-screen w-full'>
      <div className='relative h-3/5 w-full'>
        <Image src={image} alt=''  className='brightness-50 h-screen w-full object-cover' />
        <h3 className='absolute text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 right-0 top-0 text-white'>
          Dubai
        </h3>
      </div>
      <div className='relative z-20 -mt12 h-full w-full flex flex-col items-center '>
        <form action="" className='border w-2/3 h-28 border-slate-500 px-4 py-12 rounded-xl bg-blue-600 text-white flex justify-between items-center '>
          <div className='flex flex-col items-center gap-1'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>
              City
            </h3>
            <Select data={optionLocations} className="text-blue-800 p-2 rounded-xl outline-none capitalize" />
          </div>
          <div className='flex flex-col items-center gap-1'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>
                Price
            </h3>
            <div className='flex items-center gap-2'>
              <Input type="number" placeholder="Min. price" className="text-blue-800 p-2 rounded-xl outline-none" />
              <Input type="number" placeholder="Max. price" className="text-blue-800 p-2 rounded-xl outline-none" />
            </div>

          </div>
          <div className='flex flex-col items-start gap-1'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>
              Type of hotel
            </h3>
            <Select data={optionTypes} className="text-blue-800 p-2 rounded-xl outline-none"/>
          </div>
          {/* <B */}
        </form>
        <div className='w-full mt-36 flex flex-wrap justify-center items-center gap-14'>
          {data?.map((place, index) => (
            <Card key={index} place={place} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Catalog