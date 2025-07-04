"use client"
import React, { useState } from 'react'
import Card from './card'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteReservation, getUserReservations } from "./service"
import { toast } from "react-hot-toast"
import { Calendar, Filter, Search, MapPin, Loader2 } from 'lucide-react'

function Reservations() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('startDate')

  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: getUserReservations,
  })

  const { mutate } = useMutation({
    mutationFn: ({ chargeId, reservationId }: any) => deleteReservation({ chargeId, reservationId }),
    onSuccess: handleSuccess
  })

  function handleSuccess() {
    toast.success("Reservation cancelled successfully")
    queryClient.invalidateQueries({
      queryKey: ["reservations"]
    })
  }

  // Filter and sort reservations
  const filteredData = data?.filter((reservation: any) => {
    const matchesSearch = reservation.listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterStatus === 'all') return matchesSearch
    
    const now = new Date()
    const startDate = new Date(reservation.startDate)
    const endDate = new Date(reservation.endDate)
    
    const status = startDate <= now && endDate >= now ? 'active' :
                  startDate > now ? 'upcoming' : 'completed'
    
    return matchesSearch && status === filterStatus
  })?.sort((a: any, b: any) => {
    if (sortBy === 'startDate') {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    }
    return a.listing.name.localeCompare(b.listing.name)
  })

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='flex items-center gap-3 text-gray-600'>
          <Loader2 className='animate-spin' size={24} />
          <span className='text-lg'>Loading your reservations...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white shadow-sm mt-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex items-center gap-3 mb-6'>
            <Calendar className='text-blue-600' size={32} />
            <h1 className='text-3xl font-bold text-gray-900'>My Reservations</h1>
          </div>
          
          {data?.length > 0 && (
            <div className='flex flex-col sm:flex-row gap-4 items-stretch sm:items-center'>
              {/* Search */}
              <div className='relative flex-1 max-w-md'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                <input
                  type="text"
                  placeholder="Search by hotel name or location..."
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter */}
              <div className='flex gap-3'>
                <select
                  className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Reservations</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                
                <select
                  className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="startDate">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {filteredData?.length > 0 ? (
          <>
            <div className='mb-6 text-sm text-gray-600'>
              Showing {filteredData.length} of {data?.length} reservations
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredData.map((reservation: any) => (
                <Card key={reservation.id} reservation={reservation} mutate={mutate} />
              ))}
            </div>
          </>
        ) : data?.length === 0 ? (
          <div className='text-center py-16'>
            <div className='mb-6'>
              <Calendar className='mx-auto text-gray-300' size={64} />
            </div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>No reservations yet</h2>
            <p className='text-gray-600 mb-8 max-w-md mx-auto'>
              Start planning your next adventure! Browse our amazing hotels and make your first reservation.
            </p>
            <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'>
              Explore Hotels
            </button>
          </div>
        ) : (
          <div className='text-center py-16'>
            <div className='mb-6'>
              <Search className='mx-auto text-gray-300' size={64} />
            </div>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>No reservations found</h2>
            <p className='text-gray-600 mb-8'>
              Try adjusting your search terms or filters to find your reservations.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setFilterStatus('all')
              }}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Reservations