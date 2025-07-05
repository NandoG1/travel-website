import db from "@/lib/db";
import calcAndSortListings from "@/lib/sortListings";
import { NextResponse } from "next/server";

export async function GET(req:any) {
    try {
        const { searchParams } = new URL(req.url);

        const location = searchParams.get("location");
        const min_price = Number(searchParams.get("min_price")) || 0;
        const max_price = Number(searchParams.get("max_price")) || 10000000;
        const type = searchParams.get("type");

        // Build where clause dynamically
        const whereClause:any = {
            pricePerNight: {
                gte: min_price,
                lte: max_price
            }
        };

        // Only add location filter if it's provided and not empty
        if (location && location.trim() !== '') {
            whereClause.location = location;
        }

        // Only add type filter if it's provided and not empty
        if (type && type.trim() !== '') {
            whereClause.type = type;
        }

        const listings = await db.listing.findMany({
            where: whereClause,
            include: {
                reviews: true
            },
        });

        const sortedListings = calcAndSortListings(listings);
        
        return NextResponse.json(sortedListings);
    } catch (error) {
        console.error('Filter API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}