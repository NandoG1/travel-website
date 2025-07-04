"use client"
import React from 'react'
import Card from './card'
import { useQuery } from '@tanstack/react-query'
import { getBestHotels } from './service'
import { ClipLoader } from 'react-spinners'

const BestHotels = () => {
   const { data, isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: getBestHotels
  })

  if(isLoading){
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-4">
          <ClipLoader
            color={"#3b82f6"}
            size={50}
          />
          <p className="text-gray-500 font-medium">Finding the best hotels for you...</p>
        </div>
      </div>
    )
  }

  return (
    <section className='pt-20 bg-gradient-to-br from-white to-gray-50/80 relative overflow-hidden'>
      {/* Background decorations */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/30 to-purple-50/30"></div>
      <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full translate-x-1/2 opacity-20"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-x-1/2 opacity-20"></div> */}
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium mb-6 shadow-lg'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h1m4 0h1" />
            </svg>
            Premium Selection
          </div>
          
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Best 
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'> Hotels</span>
          </h2>
          
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Handpicked luxury accommodations that offer exceptional comfort, service, and unforgettable experiences. 
            Each property has been carefully selected for its outstanding quality and guest satisfaction.
          </p>
        </div>

        {/* Hotels Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {data?.map((place: any, index: number) => (
            <div key={place.id} className="h-full">
              <Card place={place} index={index}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestHotels