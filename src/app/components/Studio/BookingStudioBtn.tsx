
"use client";

import { Button } from "@/components/ui/button";
import showToast from "@/lib/helper/toaster";
import { StudioTypes } from "@/lib/types";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import getTokenForClient from "@/lib/helper/getTokenForClient";

function BookingStudioBtn({
    studioDetails,
    userData,
}: {
    studioDetails: StudioTypes;
    userData: { email: string };
}) {
    const [isBooked, setIsBooked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)


    useEffect(() => {
        const payload = new URLSearchParams({
            user_email: userData.email,
            studio_id: studioDetails._id,
        } as {
            user_email: string,
            studio_id: string
        })
        const checkBooking = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/checkBookingStudio?${payload}`,
                )

                if (res.ok) {
                    const data = await res.json()
                    setIsLoading(false)
                    if (data?.data?.Booked) setIsBooked(true)
                }
            } finally {
                setIsLoading(false)
            }

        }


        checkBooking()

    }, [studioDetails?._id, userData?.email])

    const handleSubmit = async () => {

        if (isSubmitting || isBooked) return;
        setIsSubmitting(true)
        try {
            const { _id, ...studio } = studioDetails;

            const payload = {
                ...studio,
                user_email: userData.email,
                studio_id: _id,
                Booked: true,
                status: "pending",
            };

            const token = await getTokenForClient();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/bookingStudio`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                        ,
                        Authorization: ` Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                })

            if (res.ok) {
                showToast({ message: "Studio booked successfully" })
                setIsBooked(true)
                setIsSubmitting(false)
            }
        }
        finally {
            setIsSubmitting(false)
        }
    }
    return (
        <Button
            disabled={isLoading || isSubmitting || isBooked}
            className="w-full h-12 bg-amber-400 hover:bg-amber-300 text-black"
            onClick={handleSubmit}
        >
            {isLoading ? (
                "Checking..."
            ) : isSubmitting ? (
                "Booking..."
            ) : isBooked ? (
                "Booked"
            ) : (
                <>
                    <CalendarDays className="w-4 h-4 mr-2" />
                    Book This Studio
                </>
            )}
        </Button>
    );
}

export default BookingStudioBtn;
