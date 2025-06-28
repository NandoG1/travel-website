"use client"

import Image from 'next/image';
import hotel_image_1 from "@/public/hr_1.jpg"
import hotel_image_2 from "@/public/hr_2.jpg"
import React, { useEffect, useRef, useState } from 'react'


function HotelsDetails({ctx}: any) {
  // const id = ctx.params.id
  const [selectedStar, setSelectedStar] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const swiperElRef = useRef(null);

  const handleShowModal = () => setShowModal(prev => true);
  const handleHideModal = () => setShowModal(prev => false);

  // useEffect(() => {

  // })
  return (
    <div className={`min-h-screen w-full mt-24 ${showModal && "overflow-hidden"}`}>
      <div className='h-full w-3/4 mx-auto'>
        <div>
          <div className='w-full h-[750px] overflow-hidden mx-auto'>
            <div className='w-full h-full'>
              <swiper-container ref={swiperElRef} slides-per-view="1" navigation="true" >
                <swiper-slide>
                  <Image src={hotel_image_1} alt="" className='h-[750px] w-full object-cover'/>
                </swiper-slide>
                <swiper-slide>
                  <Image src={hotel_image_2} alt="" className='h-[750px] w-full object-cover'/>
                </swiper-slide>
              </swiper-container>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelsDetails