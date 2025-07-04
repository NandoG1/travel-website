import AXIOS_API from "@/utils/axiosAPI";
import { loadStripe } from "@stripe/stripe-js"

export const redirectToCheckout = async (
    listing:any,
    startDate:any,
    endDate:any,
    daysDifference:any
) => {
    try {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

        if (!stripe) throw new Error("Stripe failed to initialize")

        console.log('Sending to stripe API:', { listing, startDate, endDate, daysDifference });

        const response = await AXIOS_API.post('/stripe', {
            listing,
            startDate,
            endDate,
            daysDifference
        })

        console.log('Full response:', response);
        console.log('Response data:', response.data);

        const sessionId = response.data?.sessionId;

        if (!sessionId) {
            console.error('No sessionId in response:', response.data);
            throw new Error("No session ID received from server");
        }

        console.log('SessionId received:', sessionId);

        const stripeError = await stripe.redirectToCheckout({
            sessionId
        })

        if(stripeError){
            console.error('Stripe redirect error:', stripeError);
            return
        }

    } 
    catch (error) {
        console.error('Checkout error:', error)
    }
}