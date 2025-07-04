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
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { getFilteredListings } from './service'
import { schema } from './schema'

interface HotelsProps{  
  name: string,
  image: string,
  price: number,
  category: string,
  reviews: number,
  location: string
}

function Catalog() {
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

  const {
    city: city_name,
    value,
    image
  }:any = optionLocations.find(location => location.value === city)

  console.log(city_name, value, image)

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


  return (
    <div className='min-h-screen w-full'>
      <div className='relative h-3/5 w-full'>
        <Image src={image} alt='' width={100} height={100} className='brightness-40 h-screen w-full object-cover' />
        <h3 className='absolute text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 right-0 top-0 text-white '>
          {city_name}
        </h3>
      </div>
      <div className='relative z-20 -mt12 h-full w-full flex flex-col items-center '>
        <form action="" onSubmit={handleSubmit(onSubmit)} className='border w-2/3 h-28 border-slate-500 px-4 py-12 rounded-xl bg-blue-600 text-white flex justify-between items-center '>
          <div className='flex flex-col items-start gap-1'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>
              City
            </h3>
            <Select register={register("location")} data={optionLocations} className="text-white p-2 rounded-xl outline-none capitalize" />
          </div>
          <div className='flex flex-col items-start gap-1'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>
                Price
            </h3>
            <div className='flex items-center gap-2'>
              <Input type="number" placeholder="Min. price" className="text-white p-2 rounded-xl outline-none" register={register("min_price", {valueAsNumber: true})} />
              <Input type="number" placeholder="Max. price" className="text-white p-2 rounded-xl outline-none" register={register("max_price", { valueAsNumber: true })} />
            </div>

          </div>
          <div className='flex flex-col items-start gap-1'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>
              Type of hotel
            </h3>
            <Select register={register("type")} data={optionTypes} className="text-white p-2 rounded-xl outline-none"/>
          </div>
          <button disabled={isPending} type='submit' className="mt-6 px-6 py-2 text-[20px] bg-white text-blue-600 rounded-xl transition-all hover:bg-[#efefef]">Search</button>
        </form>
        <div className='w-full mt-36 flex flex-wrap justify-center items-center gap-14'>
          {listings?.map((place, index) => (
            <Card key={index} place={place} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Catalog