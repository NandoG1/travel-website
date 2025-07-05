"use client"
import Input from '@/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { schema } from './schema'
import Select from '@/ui/select'
import { optionLocations, optionTypes } from '@/data/data'
import toast from 'react-hot-toast'
import { createNewlisting, postImages } from './api'
import {useMutation} from "@tanstack/react-query";
import { useRouter } from 'next/navigation'

function Create() {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME || "";
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";
    const router = useRouter();
    const [images, setImages] = useState<File[]>([])



    const {mutateAsync, isPending} = useMutation({
        mutationFn: ({data,  imageUrls}:any) => createNewlisting(data, imageUrls),
        mutationKey: ["listings"]
    })

    const {
        register, 
        handleSubmit, 
        formState: {errors, isSubmitting}
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            desc: "",
            beds: 5,
            hasFreeWifi: false,
            type: "",
            location: "",
            pricePerNight: 100000,
        }
    })

    useEffect(() => {
        if(Object.keys((errors)).length > 0){
            Object.keys((errors)).map((key) => {
                toast.error(errors[key as keyof typeof errors]?.message || "An error occurred");
            })
        }
    }, [errors])

    const uploadImage = async (image:any, idx:number) => {
        if(!image) return;

        const toastId = toast.loading(`Image ${idx+1} is being uploaded`);

        const formData = new FormData();

        formData.append("file", image)
        formData.append("upload_preset", UPLOAD_PRESET);

        try{
            const imageUrl = await postImages(CLOUD_NAME, formData);
            toast.success(`Successfully upload image ${idx+1}`)
            toast.dismiss(toastId)
            return imageUrl
        }
        catch(error){
            console.log(error);
        }
    }

    const onSumbit = async(data:any) => {
        if(!images?.length) return toast.error("You must publish your images!");

        const imageUrls = await Promise.all(images.map((image, idx) => {
            const imageUrl = uploadImage(image, idx)
            return imageUrl 
        }))

        const newListing:any = await mutateAsync({data, imageUrls});
        toast.success("Redirecting to listing...");
        router.push(`/details/${newListing.id}`)
    }

    const handleImage = (e:any) => {
        setImages((prev) => {
            return [...prev, e.target.files[0]]
        })
    } 


    return (
        <div className='min-h-screen w-full flex justify-center items-center py-8'>
            <div className='w-full max-w-md mx-4 bg-white rounded-xl border border-slate-300 shadow-lg'>
                <div className='p-4 w-full border-b border-slate-300'>
                    <h3 className='text-center font-semibold text-2xl text-slate-800'>
                        Create a listing
                    </h3>
                </div>
                
                <form onSubmit={handleSubmit(onSumbit)} className='w-full px-6 py-6 flex flex-col gap-6'>
                    <div className=''>
                        <label className='text-sm font-medium text-slate-700'>Property Name</label>
                        <input 
                            type="text" 
                            {...register("name")} 
                            className="w-full text-slate-700 outline-none p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                            placeholder="Arabian Paradise"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-700'>Description</label>
                        <input 
                            type="text" 
                            {...register("desc")} 
                            className="w-full text-slate-700 outline-none p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                            placeholder="Amazing hotels. Very Recommended!"
                        />
                        {errors.desc && <p className="text-red-500 text-sm">{errors.desc.message}</p>}
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-slate-700'>Location</label>
                            <Select 
                                {...register("location")} 
                                data={optionLocations} 
                                className="w-full text-slate-700 outline-none p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                                placeholder="Select location" 
                            />
                            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                        </div>

                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-slate-700'>Property Type</label>
                            <Select 
                                {...register("type")} 
                                data={optionTypes} 
                                className="w-full text-slate-700 outline-none p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Select type"
                            />
                            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-slate-700'>Price per Night</label>
                            <input 
                                type="number" 
                                {...register("pricePerNight", {valueAsNumber: true})} 
                                step={10000} 
                                placeholder="100000" 
                                className="w-full text-slate-700 outline-none p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.pricePerNight && <p className="text-red-500 text-sm">{errors.pricePerNight.message}</p>}
                        </div>

                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-slate-700'>Number of Beds</label>
                            <input 
                                type="number" 
                                {...register("beds", {valueAsNumber: true})} 
                                step={1} 
                                min={1}
                                max={20}
                                className="w-full text-slate-700 outline-none p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="5"
                            />
                            {errors.beds && <p className="text-red-500 text-sm">{errors.beds.message}</p>}
                        </div>
                    </div>

                    <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                            <input 
                                {...register("hasFreeWifi")} 
                                type="checkbox" 
                                id="freeWifi" 
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="freeWifi" className='text-sm font-medium text-slate-700'>
                                Free WiFi Available
                            </label>
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="images" className='text-sm font-medium text-slate-700'>
                            Upload Images
                        </label>
                        <div className='border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors'>
                            <input 
                                onChange={handleImage} 
                                type="file" 
                                id='images' 
                                multiple
                                accept="image/*"
                                className='hidden'
                            />
                            <label htmlFor="images" className='cursor-pointer text-slate-600 hover:text-blue-600'>
                                <div className='flex flex-col items-center gap-2'>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4V6a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7zm8-8a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm">Click to upload images</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isPending} 
                        className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium px-4 py-3 rounded-lg transition-colors duration-200'
                    >
                        {isPending ? 'Creating...' : 'Create Listing'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Create