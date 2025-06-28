import React from 'react'
import Image from "next/image"

const Hero = () => {
  return (
    <div>
        <div>
            <div className='relative h-screen w-full'>
                <Image src={image}/>
            </div>
        </div>
    </div>
  )
}

export default Hero