import db from "@/lib/db";

import calcAndSortListings from "@/lib/sortListings";
import { NextResponse } from "next/server";

export async function GET(req:any){
    try{
        const listings = await db.listing.findMany({
            include:{
                reviews: true
            }
        })

        const sortedListings = calcAndSortListings(listings).slice(0,4)

        return NextResponse.json(sortedListings)
    }
    catch(error){
        return NextResponse.json(error);
    }
}