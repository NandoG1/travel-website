import db from "@/lib/db";
import { getDatesInRange } from "@/lib/dateToMilliseconds";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const { default: Stripe } = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-06-30.basil"
})

export async function POST(req:any) {
    console.log('Webhook received');
    
    const sig = (await headers()).get("stripe-signature")
    const body = await req.text()

    let event

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
        console.log('Webhook event constructed successfully:', event.type);
    } catch (error) {
        console.error('Webhook signature verification failed:', error);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        console.log('Processing checkout.session.completed event');
        
        try {
            const session = event.data.object
            console.log('Session data:', session);
            
            const paymentIntentId = session.payment_intent
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
            const chargeId = paymentIntent.latest_charge

            const {
                startDate,
                endDate,
                listingId,
                pricePerNight,
                daysDifference,
                userId
            } = session.metadata

            console.log('Metadata extracted:', {
                startDate, endDate, listingId, pricePerNight, daysDifference, userId
            });

            const reservedDates = getDatesInRange(startDate, endDate)
            console.log('Reserved dates:', reservedDates);

            const reservationData = {
                userId,
                listingId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                chargeId,
                reservedDates,
                daysDifference: Number(daysDifference)
            }

            console.log('Creating reservation with data:', reservationData);

            const newReservation = await db.reservation.create({
                data: reservationData
            })

            console.log('Reservation created successfully:', newReservation);

            return NextResponse.json({ success: true, reservation: newReservation })
        } catch (error) {
            console.error('Error processing webhook:', error);
            return NextResponse.json({ error: 'Error processing webhook', details: error }, { status: 500 });
        }
    } else {
        console.log('Unhandled event type:', event.type);
        return NextResponse.json({ message: 'Event type not handled' });
    }
}