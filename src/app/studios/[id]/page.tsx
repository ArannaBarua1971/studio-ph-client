
import {
    ArrowLeft,
    MapPin,
    Star,
    Users,
    Maximize2,
    ShieldCheck,
    Check,

    ChevronLeft,
    ChevronRight,
    CalendarCheck,
    Share2,
    Heart,
    Expand,
    X
} from 'lucide-react';
import Link from 'next/link';

export default async function StudioDetailPage() {



    const studio = {
        "id": "tracking-room-a",
        "name": "Tracking Room A Live Recording Studio",
        "category": "Music Studio",
        "image": "/images/studios/tracking-room-a.jpg",
        "imageAlt": "Live recording room with drum kit, amps and vocal booth",
        "verified": true,
        "rating": 4.91,
        "reviewCount": 83,
        "sqft": 1100,
        "location": "Bushwick, Brooklyn, NY",
        "maxGuests": 10,
        "features": ["Ludwig Drum Kit", "API 1608 Console"],
        "pricePerHour": 85,
        "deposit": 120,
        "href": "/studios/tracking-room-a"
    }

    return (
        <div className="min-h-screen bg-stone-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Navigation Breadcrumb & Actions */}
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-950 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Studios Directory</span>
                    </Link>

                </div>

                {/* Studio Header Details */}
                <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="bg-stone-900 text-stone-100 text-xs font-semibold px-2.5 py-1 rounded-md">
                            {studio.category}
                        </span>
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{studio.rating.toFixed(2)}</span>
                        </div>

                    </div>

                    <h1 className="text-2xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
                        {studio.name}
                    </h1>

                    <div className="mt-2 flex items-center gap-2 text-sm text-stone-600">
                        <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{studio.location}</span>
                    </div>
                </div>

                {/* Gallery Carousel with Lightbox Trigger */}
                <div className="mb-10 space-y-3">

                </div>

                {/* 2-Column Split: Interactive Tabs Left, Contiguous Booking Module Right */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT 2 COLUMNS: Specifications & Interactive Tabbed View */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Quick Specs Bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
                            <div>
                                <span className="block text-[11px] uppercase font-bold text-stone-400">
                                    Capacity
                                </span>
                                <span className="text-sm font-bold text-stone-900 flex items-center gap-1.5 mt-0.5">
                                    <Users className="w-4 h-4 text-stone-500" />
                                    Up to {studio.maxGuests} people
                                </span>
                            </div>

                            <div>
                                <span className="block text-[11px] uppercase font-bold text-stone-400">
                                    Space Size
                                </span>
                                <span className="text-sm font-bold text-stone-900 flex items-center gap-1.5 mt-0.5">
                                    <Maximize2 className="w-4 h-4 text-stone-500" />
                                    {studio.sqft} sq ft
                                </span>
                            </div>

                            <div>
                                <span className="block text-[11px] uppercase font-bold text-stone-400">
                                    Security Deposit
                                </span>
                                <span className="text-sm font-bold text-stone-900 mt-0.5 block">
                                    ${studio.deposit} (Refundable)
                                </span>
                            </div>

                            <div>
                                <span className="block text-[11px] uppercase font-bold text-stone-400">
                                    Category
                                </span>
                                <span className="text-sm font-bold text-stone-900 mt-0.5 block">
                                    {studio.category}
                                </span>
                            </div>
                        </div>


                    </div>

                    {/* RIGHT COLUMN: Contiguous Sticky Purchase Module */}
                    <div className="lg:col-span-1 sticky top-20 space-y-4">
                        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xl space-y-5">

                            <div className="flex items-baseline justify-between border-b border-stone-100 pb-4">
                                <div>
                                    <span className="text-3xl font-bold font-display text-stone-900 tabular-nums">
                                        ${studio.pricePerHour}
                                    </span>
                                    <span className="text-stone-500 text-sm"> / hour</span>
                                </div>
                                <div className="text-xs text-stone-400">
                                    Min 2 hours
                                </div>
                            </div>



                            {/* Price Calculation Breakdown */}
                            <div className="space-y-2 text-xs text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-100">
                                <div className="flex justify-between">
                                    <span>${studio.pricePerHour} × {"slotHours"} hours</span>
                                    <span className="font-semibold text-stone-900">${"slotBasePrice"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Security Deposit (Refundable)</span>
                                    <span className="font-semibold text-stone-900">${"deposit"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Cleaning & Sanitation Fee</span>
                                    <span className="font-semibold text-stone-900">${"cleaningFee"}</span>
                                </div>
                                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm font-bold text-stone-900">
                                    <span>Estimated Total</span>
                                    <span className="text-base text-amber-600 font-display tabular-nums">${"estimatedTotal"}</span>
                                </div>
                            </div>



                            <div className="text-center">
                                <span className="text-[11px] text-stone-400">
                                    Status will be submitted as "Pending" in MongoDB bookings
                                </span>
                            </div>

                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-1 text-stone-500">
                                <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    <span>Host Guarantee Protected</span>
                                </div>
                                <p className="text-[11px] leading-relaxed">
                                    Includes $1,000,000 host liability coverage and free cancellation up to 48 hours before shoot date.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};
