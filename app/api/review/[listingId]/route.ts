import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:any, ctx:any) {
    try {
        const { listingId } = await ctx.params

        const listing:any = await db.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                reviews: true
            }
        }) || "";

        const reviewsIds = listing.reviews.map(({ id }:any) => id)

        const reviews = await db.review.findMany({
            where: {
                id: {
                    in: reviewsIds
                }
            },
            include: {
                user: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(reviews, { status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }
}