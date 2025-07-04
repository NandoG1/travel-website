import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'
import { format } from "currency-formatter"
import { useRouter } from 'next/navigation'

interface BestHotelsCardProps {
    place: {
        id: string;
        name: string;
        imageUrls: string[];
        pricePerNight: number;
        category: string;
        avgRating: number;
        location: string;
    };
    index: number;
}

function Card({ place, index }: any) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/details/${place.id}`);
  };

  return (
    <div 
      className='group block transition-all duration-300 ease-in-out cursor-pointer'
      style={{
        animationDelay: `${index * 150}ms`,
        animation: 'fadeInUp 0.8s ease-out forwards'
      }}
      onClick={handleCardClick}
    >
      <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden transform hover:-translate-y-1 h-full flex flex-col'>
        {/* Image Container - Fixed height to prevent overflow */}
        <div className='relative h-48 w-full overflow-hidden flex-shrink-0'>
          <Image 
            src={place?.imageUrls[0]} 
            width={400} 
            height={192} 
            alt={place?.name}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            style={{ objectFit: 'cover' }}
          />
          
          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'></div>
          
          {/* Location badge */}
          <div className='absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800 shadow-sm'>
            📍 {place?.location}
          </div>
          
          {/* Rating badge */}
          <div className='absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm'>
            <AiFillStar className='text-yellow-400' size={14}/>
            <span className='text-xs font-semibold text-gray-800'>{place?.avgRating}</span>
          </div>
        </div>
        
        {/* Content - Takes remaining space */}
        <div className='p-5 space-y-3 flex-1 flex flex-col'>
          {/* Hotel name and category */}
          <div className='space-y-2'>
            <div className='flex items-start justify-between gap-2'>
              <h3 className='text-lg font-bold text-gray-900 line-clamp-2 leading-tight'>
                {place?.name}
              </h3>
              <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full whitespace-nowrap'>
                {place?.category || 'Luxury'}
              </span>
            </div>
          </div>
          
          {/* Amenities icons */}
          <div className='flex items-center gap-3 text-gray-500'>
            <div className='flex items-center gap-1'>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              <span className='text-sm'>WiFi</span>
            </div>
            <div className='flex items-center gap-1'>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h1m4 0h1" />
              </svg>
              <span className='text-sm'>Pool</span>
            </div>
            <div className='flex items-center gap-1'>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className='text-sm'>Spa</span>
            </div>
          </div>
          
          {/* Price and booking - Fixed at bottom */}
          <div className='flex items-center justify-between pt-3 border-t border-gray-100 mt-auto'>
            <div className='flex flex-col'>
              <span className='text-xl font-bold text-gray-900'>
                {format(place?.pricePerNight, {locale: "id-ID"})}
              </span>
              <span className='text-sm text-gray-500'>per night</span>
            </div>
            
            <Link 
              href={`/details/${place.id}`}
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300'
              onClick={(e) => e.stopPropagation()}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card