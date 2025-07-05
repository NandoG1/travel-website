import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { format } from "date-fns"
import { MapPin, Calendar, Users, CreditCard, Trash2, Eye, Clock } from 'lucide-react'

interface ReservationsProps {
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

interface CardProps {
  reservation: any,
  mutate: any
}

function Card({ reservation, mutate }: CardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const handleCancel = async () => {
    setIsDeleting(true)
    try {
      await mutate({
        chargeId: reservation.chargeId,
        reservationId: reservation.id
      })
    } finally {
      setIsDeleting(false)
      setShowCancelConfirm(false)
    }
  }

  const totalPrice = reservation.daysDifference * reservation.listing.pricePerNight
  const isUpcoming = new Date(reservation.startDate) > new Date()
  const isActive = new Date(reservation.startDate) <= new Date() && new Date(reservation.endDate) >= new Date()
  console.log(reservation)
  return (
    <div className='group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100'>
      {/* Status Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          isActive ? 'bg-green-100 text-green-800' :
          isUpcoming ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {isActive ? 'Active' : isUpcoming ? 'Upcoming' : 'Completed'}
        </span>
      </div>

      {/* Image Section */}
      <div className='relative h-48 overflow-hidden'>
        <Link href={`/details/${reservation.listingId}`}>
          <Image 
            src={reservation.listing.imageUrls[0]} 
            alt='dwdw'
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
            // width={300} 
            // height={300}
            fill
          />
        </Link>

        
        {/* Overlay with View Details */}
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <Link href={`/details/${reservation.listingId}`}>
            <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 hover:bg-gray-50">
              <Eye size={16} />
              View Details
            </button>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className='p-6 space-y-4'>
        {/* Location & Name */}
        <div>
          <div className='flex items-center gap-2 text-gray-600 mb-2'>
            <MapPin size={16} />
            <span className='text-sm font-medium'>{reservation.listing.location}</span>
          </div>
          <h3 className='font-bold text-lg text-gray-900 leading-tight'>
            {reservation.listing.name}
          </h3>
        </div>

        {/* Date Range */}
        <div className='flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg'>
          <Calendar size={16} />
          <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
            <span className='text-sm font-medium'>
              {format(new Date(reservation.startDate), "MMM dd, yyyy")}
            </span>
            <span className='hidden sm:inline text-gray-400'>→</span>
            <span className='text-sm font-medium'>
              {format(new Date(reservation.endDate), "MMM dd, yyyy")}
            </span>
          </div>
        </div>

        {/* Duration & Guests */}
        <div className='flex items-center justify-between text-sm text-gray-600'>
          <div className='flex items-center gap-2'>
            <Clock size={14} />
            <span>{reservation.daysDifference} {reservation.daysDifference === 1 ? 'night' : 'nights'}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Users size={14} />
            <span>2 guests</span>
          </div>
        </div>

        {/* Price Section */}
        <div className='bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='text-sm text-gray-600'>Total Amount</div>
              <div className='text-2xl font-bold text-gray-900'>Rp. {totalPrice.toLocaleString()}</div>
            </div>
            <div className='text-right'>
              <div className='text-sm text-gray-600'>Per Night</div>
              <div className='text-lg font-semibold text-gray-700'>Rp. {reservation.listing.pricePerNight}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 pt-2'>
          <Link href={`/details/${reservation.listingId}`} className='flex-1'>
            <button className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'>
              <Eye size={16} />
              View Details
            </button>
          </Link>
          
          {isUpcoming && (
            <button 
              onClick={() => setShowCancelConfirm(true)}
              className='px-4 py-3 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center'
              disabled={isDeleting}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Cancel Reservation</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your reservation at {reservation.listing.name}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keep Reservation
              </button>
              <button 
                onClick={handleCancel}
                disabled={isDeleting}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Canceling...' : 'Cancel Reservation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card