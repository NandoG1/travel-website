import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req:any){
    try{
        const currentUser:any = await getCurrentUser();

        if(!currentUser?.isAdmin){
            return NextResponse.json("User must be an admin");
        }
        const body = await req.json()

        Object.values(body).forEach((v) => {
            if(v==="") return NextResponse.json("Fill all fields!")
        })

        const {
            name, location, desc, type, pricePerNight, beds, hasFreeWifi, imageUrls
        } = body

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