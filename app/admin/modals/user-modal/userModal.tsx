"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { schema } from './schema'
import ModalLayout from '../../layouts/modalLayout'
import Input from '@/ui/input'
// import Button from '@/ui/Button'
// import { getUserById, updateUser } from './service'
import { getUserById, updateUser } from './service'

const UserModal = ({
    userId,
    handleHideModal
}:any) => {
    const { data: user, isPending }:any = useQuery({
        queryFn: () => getUserById(userId),
        queryKey: ["admin", "users", { userId }]
    })

    const queryClient = useQueryClient()
    const { mutate: handleUpdateUser, isPending: isPendingMutation } = useMutation({
        mutationFn: ({ userId, data }:any) => updateUser({ userId, data }),
        onSuccess: () => {
            toast.success("Successfully updated the user")
            queryClient.invalidateQueries({
                queryKey: ["admin", "users"]
            })
        }
    })

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        reset({
            username: user?.username,
            email: user?.email
        })
    }, [user?.username, user?.email])

    const onSubmit = (data:any) => {
        handleUpdateUser({ userId, data })
        handleHideModal()
    }


    return (
        <ModalLayout
            document="User"
            handleHideModal={handleHideModal}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full px-4 py-6 flex flex-col items-center gap-8"
            >
                <Input
                    className="w-full px-2 py-3 rounded-xl"
                    type="text"
                    placeholder="john"
                    register={register("username")}
                />
                <Input
                    className="w-full px-2 py-3 rounded-xl"
                    type="email"
                    placeholder="john@gmail.com"
                    register={register("email")}
                />
                <button
                    className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700"
                    disabled={isPendingMutation}
                >
                    Submit
                    </button>
            </form>
        </ModalLayout>
    )
}

export default UserModal