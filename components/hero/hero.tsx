import React from 'react'
import Image from "next/image"

interface HeroProps{
  image: string,
  mainHeader: string,
  secondaryHeader: string
}

const Hero = ({
  image, mainHeader, secondaryHeader
}: HeroProps) => {
  return (
    <div>
        <div className='relative h-screen w-full'>
            <Image src={image} alt="" fill className="object-cover brightness-50 h-full w-full"/>
            <div className='absolute z-10 top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-8'>
              <h2 className='text-white text-6xl font-bold'>
                {mainHeader}
              </h2>
              <h5 className='text-white text-4xl font-bold'>
                {secondaryHeader}
              </h5>
            </div>
        </div>
    </div>
  )
}

export default Hero