import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";

export async function GET() {
    try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser || !currentUser.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const reservations = await db.reservation.findMany({
            include: {
                listing: {
                    select: {
                        name: true,
                        pricePerNight: true,
                        location: true
                    }
                },
                user: {
                    select: {
                        username: true,
                        email: true
                    }
                }
            },
            orderBy: {
                startDate: 'desc'
            }
        });

        return NextResponse.json(reservations);
    } catch (error) {
        console.error('Error fetching admin reservations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reservations' },
            { status: 500 }
        );
    }
}
