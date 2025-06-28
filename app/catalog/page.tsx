import React from 'react'
import Image from 'next/image'
import image from "@/public/hr_1.jpg"

function Catalog() {
  return (
    <div className='min-h-screen w-full'>
      <div className='relative h-3/5 w-full'>
        <Image src={image} alt='' className='brightness-50 h-screen w-full object-cover' />
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
            <Selec
          </div>
        </form>
      </div>
    </div>
  )
}

export default Catalog