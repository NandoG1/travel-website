"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { IoCreateOutline } from "react-icons/io5"
import { AiOutlineHome } from 'react-icons/ai'
import { FaUser, FaArrowLeft } from 'react-icons/fa'
import CreateModal from '../modals/create-modal/createModal'

const Navbar = () => {
    const [showModal, setShowModal] = useState(false)

    const handleHideModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)

    return (
        <div className="sticky top-0 left-0 w-full flex justify-between items-center">
            <Link href="/admin/dashboard" className="flex items-center gap-2 transition-all">
                <h1 className="text-blue-600 text-2xl font-bold">
                    TravelAdmin
                </h1>
                <AiOutlineHome
                    size={25}
                    color="rgb(37 99 235)"
                />
            </Link>
            <div className="flex items-center gap-6">
                <Link href="/create" className="bg-[#4522f4] px-2 py-1 cursor-pointer rounded-xl transition hover:bg-[#5738f2]">
                    <IoCreateOutline
                        size={20}
                        color="#fff"
                    />
                </Link>
                <Link href="/" className="cursor-pointer">
                    <FaArrowLeft size={22} color="rgb(37 99 235)" />
                </Link>
                {showModal && (
                    <CreateModal
                        handleHideModal={handleHideModal}
                    />
                )}
            </div>
        </div>
    )
}

export default Navbar