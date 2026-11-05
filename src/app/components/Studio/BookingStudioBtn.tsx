
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
    const [isBooked, setIsBooked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const checkBooking = async () => {
            setIsLoading(true);

            try {
                const payload = new URLSearchParams({
                    user_email: userData.email,
                    studio_id: studioDetails._id,
                } as {
                    user_email: string,
                    studio_id: string
                });

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/checkBookingStudio?${payload}`
                );

                if (!res.ok) {
                    showToast({ message: "Failed to check booking status",type:"warning" });
                }

                const data = await res.json();

                if (isMounted) {
                    setIsBooked(Boolean(data?.data?.Booked));
                }
            } catch (error) {
                console.error(error);
                if (isMounted) {
                    showToast({ message: "Failed to check booking status",type:"warning" });
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        checkBooking();

        return () => {
            isMounted = false;
        };
    }, [studioDetails._id, userData.email]);

    const handleSubmit = async () => {
        if (isSubmitting || isBooked) return;

        setIsSubmitting(true);

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

            if (!token) {
                throw new Error("Authentication token not found");
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/bookingStudio`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(
                    errorData?.message || "Failed to book studio"
                );
            }

            showToast({ message: "Studio booked successfully" });
            setIsBooked(true);
        } catch (error) {
            console.error(error);

            showToast({
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
