"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider = ({ children }: LayoutProviderProps) => {
    const pathName = usePathname()
  return (
    <>
        {pathName !== "/login" && pathName !== "/signup" && <Navbar/>}
        {children}
        {pathName !== "/login" && pathName !== "/signup" && <Footer/>}
    </>
  )
}

export default LayoutProvider