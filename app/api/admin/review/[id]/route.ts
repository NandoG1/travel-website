import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function DELETE(req:any, ctx:any) {
    try {
        await isAdminUser()

        const { id } = ctx.params

        const review = await db.review.delete({
            where: { id }
        })

        if (review) {
            return NextResponse.json({ message: "Successfully deleted the review" })
        } else {
            return NextResponse.json({ message: `Review with the id of ${id} doesn't exist` })
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}