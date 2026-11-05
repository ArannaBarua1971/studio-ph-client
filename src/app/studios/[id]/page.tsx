
import {
    ArrowLeft,
    MapPin,
    Users,
    ShieldCheck,
    Clock,
    Check,
    Camera,
} from "lucide-react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingStudio from "@/app/components/Studio/BookingStudioBtn";
import getTokenForServer from "@/lib/helper/getTokenForServer";


export default async function StudioDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studioDetails/${id}`
    );
    const result = await res.json()
    const studio = result.data

    const hourlyRate = Number(studio.hourtlyRate) || 0;
    const deposit = Number(studio.deposit) || 0;
    const cleaningFee = Number(studio.cleaningFee) || 0;
    const images = studio.images.filter((img: string) => img[1] != "")
    const formatPrice = (price: number) =>
        `$${price.toLocaleString("en-US")}`;


    const { user } = await auth.api.getSession({ headers: await headers() })
    return (
        <div className="min-h-screen bg-stone-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Navigation */}
                <div className="mb-7">
                    <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-950 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Studios
                    </Link>
                </div>

                {/* Studio Header */}
                <div className="mb-7 space-y-3">

                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-stone-900 hover:bg-stone-800">
                            {studio.category}
                        </Badge>

                        {user.email == studio.user_email ?
                            <Badge variant="outline" className="gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                Studio Listing
                            </Badge> : <></>
                        }
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
                        {studio.title}
                    </h1>

                    <div className="flex items-center gap-2 text-sm text-stone-500">
                        <MapPin className="w-4 h-4 text-amber-600" />
                        <span>{studio.location}</span>
                        <span>·</span>
                        <span>{studio.address}</span>
                    </div>

                </div>

                {/* Image Carousel */}
                <div className="mb-10">
                    <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                        <CarouselContent className="-ml-3">
                            {images?.map((image: string, index: number) => (
                                image[1] ? <CarouselItem
                                    key={index}
                                    className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="relative h-[260px] sm:h-[320px] overflow-hidden rounded-2xl bg-stone-200">
                                        <img
                                            src={image[1]}
                                            alt={`${studio.title} image ${index + 1}`}
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </CarouselItem> : <></>
                            ))}
                        </CarouselContent>

                        {images?.length > 1 && (
                            <>
                                <CarouselPrevious className="left-4" />
                                <CarouselNext className="right-4" />
                            </>
                        )}
                    </Carousel>

                    <div className="flex items-center gap-2 mt-3 text-xs text-stone-400">
                        <Camera className="w-4 h-4" />
                        {images?.length || 0} Photos
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-7">

                        {/* Quick Specifications */}
                        <Card className="rounded-2xl shadow-sm border-stone-200">
                            <CardContent className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-6">

                                <div className="space-y-2">
                                    <Users className="w-5 h-5 text-amber-600" />
                                    <p className="text-xs text-stone-400 font-semibold uppercase">
                                        Capacity
                                    </p>
                                    <p className="font-bold text-stone-900">
                                        {studio.max_capacity} People
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Clock className="w-5 h-5 text-amber-600" />
                                    <p className="text-xs text-stone-400 font-semibold uppercase">
                                        Hourly Rate
                                    </p>
                                    <p className="font-bold text-stone-900">
                                        {formatPrice(hourlyRate)}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                                    <p className="text-xs text-stone-400 font-semibold uppercase">
                                        Deposit
                                    </p>
                                    <p className="font-bold text-stone-900">
                                        {formatPrice(deposit)}
                                    </p>
                                </div>

                            </CardContent>
                        </Card>

                        {/* Overview */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-stone-900">
                                About this studio
                            </h2>

                            <Card className="rounded-2xl border-stone-200 shadow-sm">
                                <CardContent className="p-6">
                                    <p className="text-sm leading-7 text-stone-600 whitespace-pre-line">
                                        {studio.overview}
                                    </p>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Features */}
                        {studio.features.length ?
                            <section className="space-y-4">
                                <h2 className="text-xl font-bold text-stone-900">
                                    Studio Features
                                </h2>
                                <Card className="rounded-2xl border-stone-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {studio.features?.map((feature: string, index: number) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 text-sm text-stone-700"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                                        <Check className="w-4 h-4 text-emerald-600" />
                                                    </div>
                                                    <span className="font-medium">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </section>
                            : <></>}

                    </div>

                    {/* Right Booking Sidebar */}
                    <div className="lg:sticky lg:top-20">
                        <Card className="rounded-2xl border-stone-200 shadow-lg">
                            <CardContent className="p-6 space-y-5">

                                {/* Price */}
                                <div className="flex items-end justify-between">
                                    <div>
                                        <span className="text-3xl font-bold text-stone-900">
                                            {formatPrice(hourlyRate)}
                                        </span>
                                        <span className="text-sm text-stone-500">
                                            {" "}/ hour
                                        </span>
                                    </div>

                                    <Badge variant="outline">
                                        Hourly Booking
                                    </Badge>
                                </div>

                                <Separator />

                                {/* Pricing Breakdown */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-stone-900">
                                        Pricing Details
                                    </h3>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">
                                            Hourly Rate
                                        </span>
                                        <span className="font-semibold">
                                            {formatPrice(hourlyRate)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">
                                            Security Deposit
                                        </span>
                                        <span className="font-semibold">
                                            {formatPrice(deposit)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">
                                            Cleaning Fee
                                        </span>
                                        <span className="font-semibold">
                                            {formatPrice(cleaningFee)}
                                        </span>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-stone-900">
                                            Starting Total
                                        </span>
                                        <span className="text-xl font-bold text-amber-600">
                                            {formatPrice(hourlyRate + deposit + cleaningFee)}
                                        </span>
                                    </div>

                                    <p className="text-xs text-stone-400">
                                        Based on one hour of booking. Deposit is included.
                                    </p>
                                </div>

                                {/* Booking Button */}
                                <BookingStudio studioDetails={studio} userData={user} />

                                <p className="text-center text-xs text-stone-400">
                                    Booking will be subject to host approval.
                                </p>

                                {/* Guarantee */}
                                <div className="p-4 bg-emerald-50 rounded-xl space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                                        <ShieldCheck className="w-4 h-4" />
                                        Secure Booking
                                    </div>

                                    <p className="text-xs leading-relaxed text-emerald-700">
                                        Your booking request will be securely submitted for confirmation.
                                    </p>
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
