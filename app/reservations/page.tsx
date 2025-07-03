"use client"
import React from 'react'
import listing_image from "@/public/hr_1.jpg"
import Card from './card'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteReservation, getUserReservations } from "./service"
import { toast } from "react-hot-toast"
import { CiHospital1 } from 'react-icons/ci'

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
  // const data: ReservationsProps[] = [
  //   {
  //     id: crypto.randomUUID(),
  //     listingId: 1,
  //     image: listing_image.src,
  //     location: "Dubai",
  //     name: "Arabian Paradise",
  //     startDate: new Date(),
  //     endDate: new Date(new Date()),
  //     daysDifference: 5,
  //     pricePerNight: 500,
  //   },
  //    {
  //     id: crypto.randomUUID(),
  //     listingId: 2,
  //     image: listing_image.src,
  //     location: "Dubai",
  //     name: "Arabian Paradise",
  //     startDate: new Date(),
  //     endDate: new Date(new Date()),
  //     daysDifference: 5,
  //     pricePerNight: 500,
  //   },
  //    {
  //     id: crypto.randomUUID(),
  //     listingId: 3,
  //     image: listing_image.src,
  //     location: "Dubai",
  //     name: "Arabian Paradise",
  //     startDate: new Date(),
  //     endDate: new Date(new Date()),
  //     daysDifference: 5,
  //     pricePerNight: 500,
  //   }
  // ]

  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: getUserReservations,
  })

  const { mutate } = useMutation({
    mutationFn: ({ chargeId, reservationId }:any) => deleteReservation({ chargeId, reservationId }),
    onSuccess: handleSuccess
  })

  function handleSuccess() {
    toast.success("Successfully deleted a reservation")
    queryClient.invalidateQueries({
      queryKey: ["reservations"]
    })
  }

  return (
    <div className='mt-24 px-16 min-h-screen w-full'>
      <div className='h-full w-full flex flex-wrap gap-12'>
          {data?.length > 0 ? data?.map((hotel:any) => (
            <Card key={hotel.id} reservation={hotel} mutate={mutate} />
          )):<h1 className="text-center text-3xl font-bold text-slate-700">You have no reservations.</h1>}
      </div>
    </div>
  )
}

export default Reservations