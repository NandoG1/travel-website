"use client"
import Image from 'next/image'
import image from "@/public/hr_1.jpg"
import Select from '@/ui/select'
import { optionLocations, optionTypes } from '@/data/data'
import Input from '@/ui/input'
import image_1 from '@/public/hr_1.jpg'
import image_2 from '@/public/hr_2.jpg'
import image_3 from '@/public/hr_3.jpg'
import image_4 from '@/public/hr_4.jpg'
import image_5 from '@/public/hr_5.jpg'
import image_6 from '@/public/hr_6.jpg'
import image_7 from '@/public/hr_7.jpg'
import Card from "@/components/best-hotels/card"
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import React, { useEffect, Suspense } from 'react'
import { toast } from 'react-hot-toast'
import { getFilteredListings } from './service'
import { schema } from './schema'
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaHotel, FaFilter } from 'react-icons/fa'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { ClipLoader } from 'react-spinners'

interface HotelsProps{  
  name: string,
  image: string,
  price: number,
  category: string,
  reviews: number,
  location: string
}

// Separate component that uses useSearchParams
function CatalogContent() {
  const data: HotelsProps[] = [
    {
      name: "Arabian Paradise",
      image: image_1.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_2.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_3.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_4.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_5.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_6.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_7.src,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
  ]

  const searchParams = useSearchParams()

  const city = searchParams.get("city")
  const min_price = searchParams.get("min_price")
  const max_price = searchParams.get("max_price")
  const type = searchParams.get("type")
  const router = useRouter()

  const locationData:any = optionLocations.find(location => location.value === city)
  const {
    city: city_name,
    value,
    image: cityImage
  } = locationData || { city: "All Cities", value: "", image: image }

  console.log(city_name, value, cityImage)

  const defaultValues = {
    location: value,
    min_price: min_price ? Number(min_price) : 0,
    max_price: max_price ? Number(max_price) : 0,
    type: type || ""
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: {
      errors
    }
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  })

  const queryClient = useQueryClient()
  const { data: listings, isPending } = useQuery({
    queryFn: () => getFilteredListings(getValues()),
    queryKey: ["listings"]
  });

  // useEffect(() => {
  //   if (errors) {
  //     Object.keys(errors).map((key) => {
  //       const fieldKey = key as keyof typeof errors;
  //       toast.error(errors[fieldKey]?.message)
  //     })
  //   }
  // }, [errors])

  const onSubmit = async (data:any) => {
    await getFilteredListings(data)

    queryClient.invalidateQueries({ queryKey: ["listings"] })

    const newUrl = `/catalog?city=${data.location}&min_price=${data.min_price}&max_price=${data.max_price}&type=${data.type}`

    router.push(newUrl, { scroll: false })
  }

  const EmptyState = () => (
    <div className="w-full flex flex-col items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <AiOutlineSearch className="mx-auto text-gray-300" size={80} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No hotels found</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We couldn't find any hotels matching your search criteria. Try adjusting your filters or search in a different location.
        </p>
        <div className="space-y-3 text-sm text-gray-500">
          <p>• Try different price ranges</p>
          <p>• Check other locations</p>
          <p>• Remove some filters</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen w-full bg-gray-50'>
      {/* Hero Section */}
      <div className='relative h-96 md:h-[500px] w-full overflow-hidden'>
        <Image 
          src={cityImage || image} 
          alt='' 
          width={100} 
          height={100} 
          className='brightness-50 h-full w-full object-cover' 
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4 capitalize'>
              {city_name}
            </h1>
            <p className='text-lg md:text-xl text-gray-200 max-w-2xl mx-auto px-4'>
              Discover amazing hotels and accommodations in {city_name}
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className='relative z-20 -mt-16 pb-8'>
        <div className='max-w-6xl mx-auto px-4'>
          <form onSubmit={handleSubmit(onSubmit)} className='bg-white rounded-2xl shadow-2xl p-6 md:p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <FaFilter className='text-blue-600' size={24} />
              <h2 className='text-xl font-bold text-gray-900'>Find Your Perfect Stay</h2>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {/* Location */}
              <div className='space-y-2'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                  <FaMapMarkerAlt className='text-blue-600' />
                  City
                </label>
                <Select 
                  register={register("location")} 
                  data={optionLocations} 
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900" 
                />
              </div>

              {/* Price Range */}
              <div className='space-y-2'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                  <FaDollarSign className='text-green-600' />
                  Price Range (10.000 - 10.000.000)
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900" 
                    register={register("min_price", {valueAsNumber: true})} 
                  />
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900" 
                    register={register("max_price", { valueAsNumber: true })} 
                  />
                </div>
              </div>

              {/* Hotel Type */}
              <div className='space-y-2'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                  <FaHotel className='text-purple-600' />
                  Hotel Type
                </label>
                <Select 
                  register={register("type")} 
                  data={optionTypes} 
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900"
                />
              </div>

              {/* Search Button */}
              <div className='flex items-end'>
                <button 
                  disabled={isPending} 
                  type='submit' 
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isPending ? (
                    <>
                      <ClipLoader size={20} color="white" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaSearch size={16} />
                      Search Hotels
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ClipLoader size={50} color="#3B82F6" />
            <p className="mt-4 text-gray-600 text-lg">Finding the best hotels for you...</p>
          </div>
        ) : (
          <>
            {/* Results Header */}
            {listings && listings.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {listings.length} hotel{listings.length !== 1 ? 's' : ''} found
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Best accommodations in {city_name}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Sorted by:</span>
                      <span className="font-medium text-gray-900">Relevance</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hotels Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {listings && listings.length > 0 ? (
                listings.map((place, index) => (
                  <div key={index} className="transform transition-all duration-200 hover:scale-105">
                    <Card place={place} />
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <EmptyState />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Loading component for Suspense
function CatalogLoading() {
  return (
    <div className='min-h-screen w-full bg-gray-50 flex items-center justify-center'>
      <div className="flex flex-col items-center gap-4">
        <ClipLoader size={50} color="#3B82F6" />
        <p className="text-gray-600 text-lg">Loading catalog...</p>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
function Catalog() {
  return (
    <Suspense fallback={<CatalogLoading />}>
      <CatalogContent />
    </Suspense>
  )
}

export default Catalog