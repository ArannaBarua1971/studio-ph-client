"use client"
import { Button } from "@/components/ui/button";
import showToast from "@/lib/helper/toaster";
import { StudioTypes } from "@/lib/types";
import {
    CalendarDays,
} from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import getTokenForClient from "@/lib/helper/getTokenForClient";

function BookingStudioBtn({ studioDetails, userData }: { studioDetails: StudioTypes, userData: { email: string } }) {

    const [isBooked, setIsBooked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setIsLoading(true)
        const payload = new URLSearchParams({
            user_email: userData.email,
            studio_id: studioDetails._id,
        } as {
            user_email: string,
            studio_id: string
        })
        const checkBooking = async () => {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/checkBookingStudio?${payload}`,
            )

            if (res.ok) {
                const data = await res.json()
                setIsLoading(false)
                if (data?.data?.Booked) setIsBooked(true)
            }

        }

        checkBooking()

    }, [studioDetails?._id, userData?.email])

    const handleSubmit = async () => {
        const { _id, ...studio } = studioDetails
        const payload = {
            ...studio,
            user_email: userData.email,
            studio_id: _id,
            Booked: true,
            status: "pending"
        }
        const token = await getTokenForClient()

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/bookingStudio`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    ,
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })

        if (res.ok) {
            showToast({ message: "Studio booked successfully" })
            setIsBooked(true)
        }
    }

    return (

        <Button disabled={isBooked} className="w-full h-12 bg-amber-400 hover:bg-amber-300 text-black" onClick={handleSubmit}>

            {isLoading ? <Loading /> : !isBooked ? <><CalendarDays className="w-4 h-4 mr-2" />Book This Studio</> : <>Booked</>}
        </Button>

    )
}

export default BookingStudioBtn
