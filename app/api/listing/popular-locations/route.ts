import db from "@/lib/db";
import { NextResponse } from "next/server";
import isAdminUser from "@/lib/isAdminUser";

import Abu_dhabi from "@/public/AbuDhabi.jpg"
import Dubai from "@/public/dubai.jpg"
import Berlin from "@/public/berlin.jpg"
import Hambrug from "@/public/Hamburg.jpg"
import Paris from "@/public/paris.jpg"
import St_tropez from "@/public/StTropez.jpg"
import Mumbai from "@/public/Mumbai.jpg"
import Delhi from "@/public/delhi.jpg"

export async function GET(req:any){
    try{
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
        const hambrug_listings = await db.listing.count({
            where: {
                location: "hambrug"
            }
        })
        const st_tropez_listings = await db.listing.count({
            where: {
                location: "st_tropez"
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
                image: Abu_dhabi.src,
                value: "abu-dhabi"
            },
             {
                numOfPlace: dubai_listings,
                image: Dubai.src,
                value: "dubai"
            },
             {
                numOfPlace: mumbai_listings,
                image: Mumbai.src,
                value: "mumbai"
            },
             {
                numOfPlace: delhi_listings,
                image: Delhi.src,
                value: "delhi"
            },
             {
                numOfPlace: berlin_listings,
                image:Berlin.src,
                value: "berlin"
            },
             {
                numOfPlace: hambrug_listings,
                image: Hambrug.src,
                value: "hambrug"
            },
             {
                numOfPlace: st_tropez_listings,
                image: St_tropez.src,
                value: "st-tropez"
            },
             {
                numOfPlace: paris_listings,
                image: Paris.src,
                value: "paris"
            },
        ]
        const sortedResults = results.sort((a,b) => b.numOfPlace - a.numOfPlace).slice(0,4)

        return NextResponse.json(sortedResults);
    }
    catch(error){
        return NextResponse.json(error);
    }
}