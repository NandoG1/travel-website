import { format } from "currency-formatter"
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function BookModals({handleHideModal}: () => void ) {
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
                    Arabian Paradise
                </h2>
                <span className='text-slate-800'>
                    {format(325.50, {locale: "en-US"})}
                </span>
            </div>
        </div>
    </div>
  )
}

export default BookModals