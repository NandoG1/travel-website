"use client"

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import React, { useState } from 'react'
import { format } from "currency-formatter"
import { AiOutlineClose } from 'react-icons/ai'
import {DateRangePicker} from "react-date-range"
import { setDate } from "date-fns";
import { redirectToCheckout } from "./service";

interface BookModalsProps{
    handleHideModal: () => void;
}

function BookModals({listing, handleHideModal} : any ) {
    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState([
        new Date(),
        new Date(new Date().setDate(new Date().getDate() + 7))
    ])
    const selectionRange = {
        startDate: dateRange[0],
        endDate: dateRange[1],
        key: "selection"
    }


    const calcDaysDiff = () => {
       const startDate = dateRange[0];
       const endDate =  dateRange[1];

       if(startDate && endDate){
        const result = Math.ceil(((new Date(endDate)).getTime() - new Date(startDate).getTime()) / (1000*60*60*24));
        return result > 0 ? result : 1;
       }
       return 1;
    }

     const handlePayment = async () => {
        setIsLoading(true)
        const startDate = dateRange[0]
        const endDate = dateRange[1]

        const daysDifference = calcDaysDiff()

        await redirectToCheckout(listing, startDate, endDate, daysDifference)

        setIsLoading(false)
    }



  return (
    <div className='fixed z-30 backdrop-blur top-0 left-0 min-h-full w-full shadow-lg'>
        <div className='bg-slate-100 w-1/4 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-8'>
            <div className='p-4 border-b border-slate-500 flex items-center justify-between'>
                <h3 className='font-semibold text-2xl'>
                    Book your hotel
                </h3>
                <AiOutlineClose size={20} className='cursor-pointer' onClick={handleHideModal} />
            </div>
            <div className='p-4 flex items-center justify-between'>
                <h2 className='font-semibold text-[20px]'>
                    {listing?.name || 'Hotel Name'}
                </h2>
                <span className='text-slate-800'>
                    {format(listing?.pricePerNight || 0, {locale: "id-ID"})}
                </span>
            </div>
            <form action="" className="p-4 flex flex-col gap-4"> 
                {/* disable date */}
                <DateRangePicker ranges={[selectionRange]} minDate={new Date()} disabledDates={listing?.reservations?.flatMap(({reservedDated}:any) => reservedDated)} onChange={({selection}: any) => {
                    setDateRange([selection.startDate, selection.endDate])
                }}/>
            </form>
            <div className="p-4 mt-4 border-t border-slate-500 flex items-end justify-between">
                <div className="text-slate-700 flex items-center gap-2">
                    <span>
                        {format(listing?.pricePerNight || 0, {locale: "id-ID"})}
                    </span>
                    <span>X</span>
                    <span>{calcDaysDiff()}</span>
                </div>
                <div className="text-slate-700 mt-4">
                    Total Price: {format(((listing?.pricePerNight || 0) * calcDaysDiff()), {locale: "id-ID"})}
                </div>
            </div>
            <div className="w-full flex items-center mt-6">
                <button onClick={handlePayment} disabled={isLoading} className="w-3/4 mx-auto cursor-pointer rounded-lg py-3 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600">
                    Submit
                </button>

            </div>
        </div>
    </div>
  )
}

export default BookModals