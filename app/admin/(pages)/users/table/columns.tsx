"use client"
import Image from 'next/image'
import person_image from "@/public/bianco_2.png"
import { format } from 'timeago.js'
import { FaPen, FaTrash } from "react-icons/fa"
import { useUserHook } from '@/app/admin/hooks/user-hook'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
// import UserModal 
import React, { useState } from 'react'
import UserModal from '@/app/admin/modals/user-modal/userModal'
import { FaUser } from 'react-icons/fa'

export const columns = [
    {
        accessorKey: "profilePhoto",
        header: "Profile Photo",
        cell: ({ row }:any) => {
            return (
               <FaUser className='text-gray-500' size={20} />
            )
        }
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: ({ column }:any) => {
            return (
                <button
                    className="flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: "reservations",
        header: ({ column }:any) => {
            return (
                <button
                    className="Flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Reservations
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
        cell: ({ row }:any) => {
            const value = row.getValue("reservations")?.length || 0

            return (
                <div>
                    {value} reservations
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }:any) => {
            const value = row.getValue("createdAt")
            return (
                <div>
                    {format(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }:any) => {
            const { id: userId } = row.original
            const [showModal, setShowModal] = useState(false)

            const handleHideModal = () => setShowModal(false)
            const handleShowModal = () => setShowModal(true)

            const { handleDeleteUser, isPending } = useUserHook()

            return (
                <>
                    <button
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                        disabled={isPending}
                        onClick={() => handleDeleteUser(userId)}
                    >
                        <FaTrash color={`${isPending ? "#bdb2b2" : "#f00"}`} />
                    </button>
                    <button
                        onClick={handleShowModal}
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                    >
                        <FaPen color="#31b608" />
                    </button>
                    {showModal && (
                        <UserModal
                            userId={userId}
                            handleHideModal={handleHideModal}
                        />
                    )}
                </>
            )
        }
    },
]