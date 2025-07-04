import Link from 'next/link'
import React from 'react'
import Image from "next/image"

interface CardProps {
  place: {
    image: string;
    city: string;
    numOfPlace: number;
    value: string;
  };
  index: number;
}

function Card({ place, index }: CardProps) {
  const url = `/catalog?city=${place.value}&min_price=${50}&max_price=${999}&type=${"luxury"}`
  
  return (
    <Link 
      href={url} 
      className='group block cursor-pointer transform transition-all duration-500 hover:scale-105'
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.8s ease-out forwards'
      }}
    >
      <div className='relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2'>
        {/* Image Container */}
        <div className='relative h-64 w-full overflow-hidden'>
          <Image 
            src={place.image} 
            alt={`${place.value} destination`} 
            width={400} 
            height={300} 
            className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
          />
          
          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          
          {/* City badge */}
          <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800 shadow-md'>
            {place.value}
          </div>
          
          {/* Floating action button */}
          <div className='absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0'>
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        
        {/* Content */}
        <div className='p-6 space-y-4'>
          {/* Places count with icon */}
          <div className='flex items-center justify-center gap-2 text-blue-600'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h1m4 0h1" />
            </svg>
            <span className='text-2xl font-bold'>{place.numOfPlace}</span>
            <span className='text-lg'>Places to stay</span>
          </div>
          
          {/* Description */}
          <p className='text-center text-gray-600 leading-relaxed'>
            Discover the best hotels and apartments for your adventurous journey in this amazing destination.
          </p>
          
          {/* View button */}
          <div className='flex items-center justify-center pt-2'>
            <div className='inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors'>
              <span>Explore Now</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Hover border effect */}
        <div className='absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-all duration-500'></div>
      </div>
    </Link>
  )
}

export default Card