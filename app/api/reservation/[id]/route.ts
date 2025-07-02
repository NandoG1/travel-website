import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";

export async function DELETE(req:any, ctx:any) {
    try {
        const { id } = ctx.params

        const currentUser:any = await getCurrentUser() || ""

        const reservation:any = await db.reservation.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        }) || ""

        if (reservation.user.id !== currentUser.id && !currentUser.isAdmin) {
            return NextResponse.json({
                message: "User has no permissions to delete the reservation"
            })
        }

        await db.reservation.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: "Successfully deleted reservation with id of " + id }, { status: 200 })
    } 
    catch (error) {
        return NextResponse.json(error)
    }
}