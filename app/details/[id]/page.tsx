"use client"

import Image from 'next/image';
import React, { use, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { AiFillStar } from 'react-icons/ai';
import { FaBed, FaWifi, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { format } from 'currency-formatter';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Reviews from './reviews';
import BookModals from '@/components/book-modal/bookModals';
import { getListingById } from './service';

function HotelsDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [showModal, setShowModal] = useState(false);
    
    const { data: listing, isPending, error } = useQuery({
        queryKey: ["listings", { id }],
        queryFn: () => getListingById(id),
    });

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <ClipLoader color={"#3B82F6"} size={50} />
                    <p className="mt-4 text-gray-600">Loading hotel details...</p>
                </div>
            </div>
        );
    }

    if (error || !listing) { // Added !listing check for robustness
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                 <p className="text-red-600">Failed to load hotel details.</p>
            </div>
        )
    }

    return (
        <div className={`min-h-screen bg-gray-50 ${showModal ? "overflow-hidden" : ""}`}>
            {showModal && <BookModals listing={listing} handleHideModal={handleHideModal} />}
            
            <div className='relative'>
                {/* Hero Section */}
                <div className="h-[50vh] md:h-[60vh] bg-gray-200">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className="h-full w-full"
                    >
                        {listing.imageUrls?.map((imageUrl: string, index: number) => (
                            <SwiperSlide key={`${imageUrl}-${index}`} className="bg-black">
                                <div className="relative h-full w-full">
                                    <Image 
                                        src={imageUrl} 
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        alt={`View of ${listing.name} #${index + 1}`} 
                                        className='object-cover'
                                    />
                                    <div className="absolute inset-0 opacity-20"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                
                {/* FIX: Floating card now ONLY contains the booking information */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4 z-10">
                     <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                             {/* Hotel Name and basic info */}
                             <div className="flex-1">
                                 <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3'>
                                     {listing.name}
                                 </h1>
                                 <div className="flex flex-wrap items-center gap-4 text-gray-600">
                                     <div className="flex items-center gap-2">
                                         <FaBed className="text-blue-600" />
                                         <span className="font-medium">{listing.beds} beds</span>
                                     </div>
                                     {listing.hasFreeWifi && (
                                         <div className="flex items-center gap-2">
                                             <FaWifi className="text-green-600" />
                                             <span className="font-medium">Free WiFi</span>
                                         </div>
                                     )}
                                     <div className="flex items-center gap-2">
                                         <FaCalendarAlt className="text-orange-600" />
                                         <span className="font-medium">Instant booking</span>
                                     </div>
                                 </div>
                             </div>
                             
                             {/* Price and Book Now button */}
                             <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4">
                                 <div className="text-center lg:text-right">
                                     <div className="text-3xl font-bold text-gray-900">
                                         {format(listing.pricePerNight, { locale: 'id-ID' })}
                                     </div>
                                     <div className="text-gray-600">per night</div>
                                 </div>
                                 <button
                                     onClick={handleShowModal}
                                     className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all'
                                 >
                                     Book Now
                                 </button>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>

            {/* Content Section - Pushed down to make space for the floating card */}
            <div className="max-w-6xl mx-auto px-4 pt-48 pb-16">
                 {/* FIX: The overlapping content is now moved here, in the main description area */}
                 <div className="mb-16">
                     <div className="bg-white rounded-2xl shadow-sm p-8">
                         <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
                         
                         {/* This is where your description and tags should be */}
                         <p className="text-gray-700 leading-relaxed mb-6">
                             {listing.desc}
                         </p>

                     </div>
                 </div>

                 {/* Reviews Section */}
                 <div className="bg-white rounded-2xl shadow-sm p-8">
                     <div className="flex items-center gap-4 mb-8">
                         <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
                         <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                             <AiFillStar className="text-blue-600" size={20} />
                             <span className="font-semibold text-blue-600">{listing.avgRating}</span>
                             <span className="text-gray-600 text-sm">rating</span>
                         </div>
                     </div>
                     <Reviews id={id} />
                 </div>
             </div>
        </div>
    );
}

export default HotelsDetails;