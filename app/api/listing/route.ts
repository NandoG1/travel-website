import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";

export async function POST(req:any){
    try{

        await isAdminUser()

        
        const body = await req.json()

        const {
            name, location, desc, type, pricePerNight, beds, hasFreeWifi, imageUrls
        } = body

        // Validate required fields
        if (!name || !location || !desc || !type || !pricePerNight || !beds || !imageUrls?.length) {
            return NextResponse.json({ error: "Fill all fields!" }, { status: 400 });
        }

        const newListing = await db.listing.create({
            data: {
                name, location, desc, type, pricePerNight, beds, hasFreeWifi, imageUrls
            }
        })

        return NextResponse.json(newListing)
    }
    catch(error){
        return NextResponse.json(error);
    }
}