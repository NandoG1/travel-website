"use client"
import Delhi from "@/public/delhi.jpg"
import Berlin from "@/public/berlin.jpg"
import Paris from "@/public/paris.jpg"
import Dubai from "@/public/dubai.jpg"
import React from 'react'
import Card from "./card"
import { useQuery } from "@tanstack/react-query"
import { getPopularPlaces } from "./service"
import { ClipLoader } from "react-spinners"

const PopularLocations = () => {
   const { data, isLoading } = useQuery({
    queryFn: getPopularPlaces,
    queryKey: ["popular-listings"]
  })

  if(isLoading){
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <ClipLoader
            color={"#3b82f6"}
            size={50}
          />
          <p className="text-gray-500 font-medium">Loading amazing destinations...</p>
        </div>
      </div>
    )
  }

  return (
    <section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden'>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-purple-50/20"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-20"></div>
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium mb-6 shadow-lg'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Explore Top Destinations
          </div>
          
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Popular 
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'> Locations</span>
          </h2>
          
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Discover breathtaking destinations around the world. From bustling cities to serene retreats, 
            find your perfect getaway with our curated selection of top-rated locations.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.map((place: any, idx: any) => (
            <Card key={idx} place={place} index={idx} />
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center mt-16'>
          <button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
            View All Destinations Now!!!
          </button>
        </div>
      </div>
    </section>
  )
}

export default PopularLocations