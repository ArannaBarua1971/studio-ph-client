

import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
    Card,
} from "@/components/ui/card";


import Loading from "../components/common/Loading";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BookingCard from "../components/Studio/BookingCard";
import { BookingStudioTypes } from "@/lib/types";



export default async function StudioListings() {
    const data = await auth.api.getSession({ headers: await headers() })
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookingStudio/${data?.user.email}`);
    const d = await res.json();
    const studios = d.data



    if (!data?.session) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-[#fafafa] p-5 md:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">

                <div>
                    <p className="mb-2 text-xs font-semibold tracking-wider text-orange-600">
                       Creator Reservations
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                        My Bookings
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Track reserved shoot hours, status updates, and production invoices
                        ({data?.user.email}).
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">



                    {/* Add Studio */}
                    <Button
                        className="bg-amber-400 text-black hover:bg-amber-500"
                    >
                        <Link href="/studios" className="flex justify-center items-center">
                            Explore Studio
                            <ArrowRight size={17} />
                        </Link>
                    </Button>

                </div>
            </div>

            {/* Table View */}


                <div className="overflow-x-auto space-y-3">

                  {
                    studios.map((studio:BookingStudioTypes)=>(
                        <BookingCard key={studio._id} data={studio}/>
                    ))
                  }

                </div>


        </div>
    );
}
