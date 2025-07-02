import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-06-30.basil"
})

export async function POST(req:any) {
    try {
        const {
            listing: { name, pricePerNight, id: listingId },
            startDate,
            endDate,
            daysDifference
        } = await req.json()

        const stripe_obj = [
            {
                price_data: {
                    currency: "idr",
                    product_data: {
                        name
                    },
                    unit_amount: pricePerNight
                },
                quantity: daysDifference
            }
        ]

        const currentUser:any = await getCurrentUser() || ""

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: stripe_obj,
            mode: "payment",
            success_url: "http://localhost:3000/success-page",
            cancel_url: "http://localhost:3000",
            metadata: {
                startDate,
                endDate,
                listingId,
                pricePerNight,
                daysDifference,
                userId: currentUser.id,
                email: currentUser.email
            }
        })

        return NextResponse.json({ sessionId: session.id })
    } 
    catch (error) {
        return NextResponse.json(error)
    }
}

export async function DELETE(req:any) {
    try {
        const { searchParams } = new URL(req.url)
        const chargeId = searchParams.get("charge_id")
        const reservationId = searchParams.get("reservation_id")

        if (!chargeId) {
            return NextResponse.json({
                error: "Missing charge_id parameter"
            })
        }

        const refundedPayment = await stripe.refunds.create({
            charge: chargeId
        })

        if(refundedPayment.status !== "succeeded"){
            return NextResponse.json({
               error: "Cant cancel the reservation with an id of " + reservationId
            })
        }

        return NextResponse.json({message: "Successfully cancelled the reservation"})
    } 
    catch (error) {
        return NextResponse.json(error)
    }
}