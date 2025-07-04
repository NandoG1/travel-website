import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req:any, ctx:any) {
    try {
        await isAdminUser()

        const params = await ctx.params;
        const { id } = params;

        const listing = await db.listing.findUnique({
            where: { id }
        })

        return NextResponse.json(listing)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(req:any, ctx:any) {
    try {
        await isAdminUser()

        const params = await ctx.params;
        const { id } = params;
        const body = await req.json()

        const updatedListing = await db.listing.update({
            where: { id },
            data: { ...body }
        })

        return NextResponse.json(updatedListing)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function DELETE(req:any, ctx:any) {
    try {
        await isAdminUser()
        const params = await ctx.params;
        const { id } = params;

        const deletedListing = await db.listing.delete({
            where: { id }
        })

        if (deletedListing) {
            return NextResponse.json({ message: "Listing has been deleted successfully" }, { status: 200 })
        } else {
            return NextResponse.json({ message: `Listing with the id of ${id} doesnt exist!` })
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}