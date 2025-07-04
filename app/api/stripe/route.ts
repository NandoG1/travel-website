import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-06-30.basil"
})

export async function POST(req:any) {
    try {
        const body = await req.json();
        console.log('Stripe API received:', body);

        const {
            listing: { name, pricePerNight, id: listingId },
            startDate,
            endDate,
            daysDifference
        } = body;

        console.log('Extracted data:', { name, pricePerNight, listingId, startDate, endDate, daysDifference });

        const stripe_obj = [
            {
                price_data: {
                    currency: "idr",
                    product_data: {
                        name
                    },
                    unit_amount: Math.round(pricePerNight * 100) // Convert to cents for IDR
                },
                quantity: daysDifference
            }
        ]

        console.log('Stripe object:', stripe_obj);

        const currentUser:any = await getCurrentUser();
        console.log('Current user:', currentUser);

        if (!currentUser) {
            console.error('No current user found');
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

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

        console.log('Session created:', session.id);

        return NextResponse.json({ sessionId: session.id })
    } 
    catch (error) {
        console.error('Stripe API error:', error);
        return NextResponse.json({ error: 'Failed to create checkout session', details: error }, { status: 500 });
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