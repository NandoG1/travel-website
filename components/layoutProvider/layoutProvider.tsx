"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import { QueryClient , QueryClientProvider} from "@tanstack/react-query";

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider = ({ children }: LayoutProviderProps) => {
    const pathName = usePathname()
    const queryClient = new QueryClient();
  return (
    <>
        <QueryClientProvider client={queryClient}>
          {pathName !== "/login" && pathName !== "/signup" && <Navbar/>}
          {children}
          {pathName !== "/login" && pathName !== "/signup" && <Footer/>}
        </QueryClientProvider>
    </>
  )
}

export default LayoutProvider