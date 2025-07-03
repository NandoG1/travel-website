import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req:any) {
    try {
        await isAdminUser()

        const allListings = await db.listing.findMany({})

        return NextResponse.json(allListings)
    } catch (error) {
        return NextResponse.json(error)
    }
}