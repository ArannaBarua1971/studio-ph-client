// app/add-studio/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    DollarSign,
    Users,
    MapPin,
    Image as ImageIcon,
    ArrowLeft,
    Sparkles,
    Check
} from "lucide-react";
import Loading from "../../components/common/Loading";
import { useSession } from "@/lib/auth-client";
import showToast from "@/lib/helper/toaster";
import { PRESET_IMAGES, CATEGORIES, AMENITY_OPTIONS } from "@/lib/adminData/studio";
import { useRouter } from "next/navigation";
import getTokenForClient from "@/lib/helper/getTokenForClient";



const labelClass =
    "block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5";
const inputClass =
    "w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white";

export default function AddStudioPage() {
    const router=useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [amenities, setAmenities] = useState<string[]>([]);
    const [preset, setPreset] = useState(PRESET_IMAGES[1])
    const { data } = useSession()
    if (!data?.session) {
        return <Loading />
    }

    const toggleAmenity = (item: string) =>
        setAmenities((prev) =>
            prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
        );
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const user = data.user.email
            const formData = new FormData(e.currentTarget);
            const d = Object.fromEntries(formData.entries())
            
            const images = Object.entries(d).filter(([key, value]) => key.startsWith("images_"))
            const otherData = Object.fromEntries(Object.entries(d).filter(([key, value]) => !key.startsWith("images_")))
            const token =await getTokenForClient()

            const payload = { ...otherData, images, user_email: user, features: amenities };
            const res = await fetch(`http://localhost:5000/studios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setIsSubmitting(false)
                showToast({ message: "Studio is created" })
                router.push("/my-listings")
            }else{
                showToast({ message: "unauthorized",type:"warning" })
                router.push("/login")
            }
        } catch (error) {
            console.log(error)
            setIsSubmitting(false)
        }
    }
    return (
        <div className="min-h-screen bg-stone-50 py-8 sm:py-10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/mylistings"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to My Studio Listings</span>
                </Link>

                {/* Page Title */}
                <div className="mb-8">
                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                        Host Workspace Portal
                    </span>
                    <h1 className="text-2xl font-bold text-stone-900 mt-1 sm:text-3xl">
                        List a New Creative Studio Space
                    </h1>
                    <p className="mt-1 text-sm text-stone-500">
                        Publish your photo loft, film stage, or sound suite.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className={labelClass}>Studio Title *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. The Greenpoint Daylight Infinity Cyclorama"
                                name="title"
                                className={inputClass}
                            />
                        </div>

                        {/* Category & Capacity */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className={labelClass}>Category *</label>
                                <select
                                    name="category"
                                    className={`${inputClass} cursor-pointer`}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat.name} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    <Users className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
                                    Max Capacity *
                                </label>
                                <input
                                    type="number"
                                    required
                                    min={1}
                                    max={250}
                                    name="max_capacity"
                                    placeholder="e.g. 25"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Rates */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div>
                                <label className={labelClass}>
                                    <DollarSign className="w-3.5 h-3.5 inline text-stone-400" />
                                    Hourly Rate *
                                </label>
                                <input
                                    type="number"
                                    required
                                    min={10}
                                    name="hourtlyRate"
                                    placeholder="e.g. 110"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    <DollarSign className="w-3.5 h-3.5 inline text-stone-400" />
                                    Security Deposit *
                                </label>
                                <input
                                    type="number"
                                    required
                                    min={0}
                                    name="deposit"
                                    placeholder="e.g. 150"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    <DollarSign className="w-3.5 h-3.5 inline text-stone-400" />
                                    Cleaning Fee
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    name={"cleaningFee"}
                                    placeholder="e.g. 45"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Location & Address */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className={labelClass}>
                                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
                                    City & Neighborhood *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Williamsburg, Brooklyn, NY"
                                    name={"location"}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Street Address</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 240 Kent Ave, 3rd Floor"
                                    name={"address"}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Image URL */}
                        {/* Image URL & Preset Selection */}
                        <div className="space-y-2">
                            <div className="baseImg">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                                        <ImageIcon className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
                                        Studio Image URL *(Base)
                                    </label>

                                    <span className="text-[11px] text-stone-400">
                                        Select preset or enter custom URL
                                    </span>
                                </div>

                                <input
                                    type="url"
                                    name={`images_0`}
                                    placeholder={`https://... or select preset below ${preset.label}`}
                                    required
                                    className={`${inputClass}`}
                                />
                            </div>
                            <div className="extraImg">

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                                        <ImageIcon className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
                                        Studio Image URL (Extra)
                                    </label>

                                    <span className="text-[11px] text-stone-400">
                                        Select preset or enter custom URL
                                    </span>
                                </div>
                                {PRESET_IMAGES.slice(1, 6).map((p, i) => (
                                    <input
                                        key={p.label}
                                        type="url"
                                        name={`images_${i + 1}`}
                                        placeholder={`https://... or select preset below ${preset.label}`}
                                        className={`${inputClass} ${preset.label === p.label ? "block" : "hidden"}`}
                                    />
                                ))}

                                <div className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                                    <span className="text-[11px] text-stone-400 shrink-0">
                                        Presets:
                                    </span>

                                    {PRESET_IMAGES.slice(1, 6).map((p) => (
                                        <button
                                            key={p.url}
                                            type="button"
                                            onClick={() => setPreset(p)}
                                            className={`px-2.5 py-1 text-xs rounded-lg border transition-colors shrink-0 ${preset.url === p.url
                                                ? "bg-amber-100 border-amber-400 text-amber-900 font-semibold"
                                                : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                                                }`}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className={`${labelClass} mb-2`}>Amenities</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                {AMENITY_OPTIONS.map((item) => {
                                    const checked = amenities.includes(item);
                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => toggleAmenity(item)}
                                            className={`flex items-center gap-2.5 p-2.5 text-xs rounded-xl border text-left
                                                 transition-colors ${checked
                                                    ? "border-amber-500 bg-amber-50/70 text-amber-950 font-medium"
                                                    : "border-stone-200 text-stone-600 hover:bg-stone-50"
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 shrink-0 rounded flex items-center justify-center border transition-colors ${checked
                                                    ? "bg-amber-500 border-amber-500 text-white"
                                                    : "border-stone-300 bg-white"
                                                    }`}
                                            >
                                                {checked && <Check className="w-3 h-3 stroke-[3]" />}
                                            </div>
                                            <span className="truncate">{item}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>


                        {/* Overview */}
                        <div>
                            <label className={labelClass}>Detailed Overview *</label>
                            <textarea
                                required
                                rows={4}
                                name={"overview"}
                                placeholder="Describe lighting, ceiling height, gear included, load-in rules, sound isolation, and nearby catering..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="pt-4 border-t border-stone-200 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <Link
                                href="/mylistings"
                                className="px-5 py-2.5 text-center text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-xl transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-6 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>{isSubmitting ? "Publishing..." : "Publish Studio Listing"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}