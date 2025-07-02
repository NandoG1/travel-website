import db from "@/lib/db";
import calcAndSortListings from "@/lib/sortListings";
import { NextResponse } from "next/server";

export async function GET(req:any, ctx:any){
    try{    
        const {id} = ctx.params

        const listing = await db.listing.findUnique({
            where: {id},
            include :{
                reviews:true,
                reservations:true
            }
        })

        const listingsWithRating = calcAndSortListings(listing)

        return NextResponse.json(listingsWithRating)

    }
    catch(error){
        return NextResponse.json(error);
    }
}