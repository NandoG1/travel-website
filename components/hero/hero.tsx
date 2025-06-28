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
        <div>
            <div className='relative h-screen w-full'>
                <Image src={image} alt=""/>
            </div>
        </div>
    </div>
  )
}

export default Hero