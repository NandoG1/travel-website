"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import {AiOutlineHome, AiOutlineUser, AiOutlineClose} from "react-icons/ai"    
import { signOut, useSession } from 'next-auth/react'
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { MdOutlineAdminPanelSettings, MdOutlineBookmarkBorder, MdOutlineLogout } from "react-icons/md"

function Navbar() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const {data:session}:any = useSession()

    const toggleModal = () => setShowModal(prev => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset >= 0);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showModal && !(event.target as Element).closest('.user-menu')) {
                setShowModal(false);
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showModal]);

  return (
    <div className={`fixed z-50 h-16 w-full top-0 left-0 transition-all duration-300 ${
        isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
            : "bg-transparent"
    }`}>
        <div className='h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
            
            <Link href="/" className='flex items-center gap-3 transition-all duration-300 hover:scale-105 group'>
                <div className={`p-2 rounded-full transition-all duration-300 ${
                    isScrolled 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg" 
                        : "bg-white/10 backdrop-blur-sm"
                }`}>
                    <AiOutlineHome size={20} color="white"/>
                </div>
                <h1 className={`text-xl sm:text-2xl font-bold transition-all duration-300 ${
                    isScrolled 
                        ? "text-gray-800" 
                        : "text-white drop-shadow-lg"
                } group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text`}>
                    TravelStay
                </h1>
            </Link>

            <div className='hidden md:flex items-center gap-6'>

                <div className='relative user-menu'>
                    <button 
                        onClick={toggleModal}
                        className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                            isScrolled 
                                ? "bg-gray-100 hover:bg-gray-200 text-gray-700" 
                                : "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white"
                        } ${showModal ? 'ring-2 ring-blue-500' : ''}`}
                    >
                        <AiOutlineUser size={20}/>
                    </button>

                    {showModal && (
                        <div className='absolute top-16 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200'>

                            {session?.user && (
                                <div className='px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
                                    <p className='font-medium'>{session.user.username}</p>
                                    <p className='text-sm text-white/80'>{session.user.email}</p>
                                </div>
                            )}
                            
                            <div className='py-2'>
                                {session?.user?.isAdmin && (
                                    <Link 
                                        href="/admin/dashboard"
                                        className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors'
                                        onClick={() => setShowModal(false)}
                                    >
                                        <MdOutlineAdminPanelSettings size={20}/>
                                        Admin Dashboard
                                    </Link>
                                )}
                                
                                <Link 
                                    href="/reservations"
                                    className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'
                                    onClick={() => setShowModal(false)}
                                >
                                    <MdOutlineBookmarkBorder size={20}/>
                                    My Reservations
                                </Link>
                                
                                <hr className='my-2 border-gray-100'/>
                                
                                <button 
                                    onClick={() => {
                                        signOut();
                                        setShowModal(false);
                                    }}
                                    className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left'
                                >
                                    <MdOutlineLogout size={20}/>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='md:hidden'>
                <button 
                    onClick={toggleMobileMenu}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                        isScrolled 
                            ? "text-gray-700 hover:bg-gray-100" 
                            : "text-white hover:bg-white/10 backdrop-blur-sm"
                    }`}
                >
                    {isMobileMenuOpen ? <AiOutlineClose size={24}/> : <HiOutlineMenuAlt3 size={24}/>}
                </button>
            </div>
        </div>

        {isMobileMenuOpen && (
            <div className='md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg animate-in slide-in-from-top-2 duration-200'>
                <div className='px-4 py-6 space-y-4'>
                    
                    {session?.user && (
                        <>
                            <hr className='border-gray-200'/>
                            <div className='space-y-2'>
                                {session.user.isAdmin && (
                                    <Link 
                                        href="/admin/dashboard"
                                        className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <MdOutlineAdminPanelSettings size={20}/>
                                        Admin Dashboard
                                    </Link>
                                )}
                                
                                <Link 
                                    href="/reservations"
                                    className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <MdOutlineBookmarkBorder size={20}/>
                                    My Reservations
                                </Link>
                                
                                <button 
                                    onClick={() => {
                                        signOut();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors w-full text-left'
                                >
                                    <MdOutlineLogout size={20}/>
                                    Sign Out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default Navbar