import db from "@/lib/db";
import { NextResponse } from "next/server";
import isAdminUser from "@/lib/isAdminUser";

export async function GET(req: any) {
    try {
        const abudhabi_listings = await db.listing.count({
            where: {
                location: "abu-dhabi"
            }
        })
        const dubai_listings = await db.listing.count({
            where: {
                location: "dubai"
            }
        })
        const mumbai_listings = await db.listing.count({
            where: {
                location: "mumbai"
            }
        })
        const delhi_listings = await db.listing.count({
            where: {
                location: "delhi"
            }
        })
        const berlin_listings = await db.listing.count({
            where: {
                location: "berlin"
            }
        })
        const hamburg_listings = await db.listing.count({
            where: {
                location: "hamburg" // Fixed typo
            }
        })
        const st_tropez_listings = await db.listing.count({
            where: {
                location: "st-tropez" // Fixed to match return value
            }
        })
        const paris_listings = await db.listing.count({
            where: {
                location: "paris"
            }
        })

        const results = [
            {
                numOfPlace: abudhabi_listings,
                image: "/AbuDhabi.jpg", // Direct path to public folder
                value: "abu-dhabi"
            },
            {
                numOfPlace: dubai_listings,
                image: "/dubai.jpg",
                value: "dubai"
            },
            {
                numOfPlace: mumbai_listings,
                image: "/Mumbai.jpg",
                value: "mumbai"
            },
            {
                numOfPlace: delhi_listings,
                image: "/delhi.jpg",
                value: "delhi"
            },
            {
                numOfPlace: berlin_listings,
                image: "/berlin.jpg",
                value: "berlin"
            },
            {
                numOfPlace: hamburg_listings,
                image: "/Hamburg.jpg",
                value: "hamburg" // Fixed typo
            },
            {
                numOfPlace: st_tropez_listings,
                image: "/StTropez.jpg",
                value: "st-tropez"
            },
            {
                numOfPlace: paris_listings,
                image: "/paris.jpg",
                value: "paris"
            },
        ]
        
        const sortedResults = results.sort((a, b) => b.numOfPlace - a.numOfPlace).slice(0, 4)

        return NextResponse.json(sortedResults);
    }
    catch (error) {
        return NextResponse.json(error);
    }
}