import React from 'react'
import listing_image from "@/public/hr_1.jpg"
import Card from './card'

interface ReservationsProps{
  id: string,
  listingId: number
  image: string,
  location: string,
  name: string,
  startDate: Date,
  endDate: Date,
  daysDifference: number
  pricePerNight: number
}



function Reservations() {
  const data: ReservationsProps[] = [
    {
      id: crypto.randomUUID(),
      listingId: 1,
      image: listing_image.src,
      location: "Dubai",
      name: "Arabian Paradise",
      startDate: new Date(),
      endDate: new Date(new Date()),
      daysDifference: 5,
      pricePerNight: 500,
    },
     {
      id: crypto.randomUUID(),
      listingId: 2,
      image: listing_image.src,
      location: "Dubai",
      name: "Arabian Paradise",
      startDate: new Date(),
      endDate: new Date(new Date()),
      daysDifference: 5,
      pricePerNight: 500,
    },
     {
      id: crypto.randomUUID(),
      listingId: 3,
      image: listing_image.src,
      location: "Dubai",
      name: "Arabian Paradise",
      startDate: new Date(),
      endDate: new Date(new Date()),
      daysDifference: 5,
      pricePerNight: 500,
    }
  ]
  return (
    <div className='mt-24 px-16 min-h-screen w-full'>
      <div className='h-full w-full flex flex-wrap gap-12'>
          {data?.map((hotel) => (
            <Card key={hotel.id} hotel={hotel} />
          ))}
      </div>
    </div>
  )
}

export default Reservations