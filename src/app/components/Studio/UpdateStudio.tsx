
"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    DollarSign,
    Users,
    Pencil,
    MapPin,
    Image as ImageIcon,
    Sparkles,
    Check
} from "lucide-react";

import {
    PRESET_IMAGES,
    CATEGORIES,
    AMENITY_OPTIONS
} from "@/lib/adminData/studio";

import { useState } from "react";
import { StudioTypes } from "@/lib/types";
import showToast from "@/lib/helper/toaster";
import { redirect } from "next/navigation";
import getTokenForClient from "@/lib/helper/getTokenForClient";

const labelClass =
    "block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5";

const inputClass =
    "w-full min-w-0 px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white";

export function UpdateStudio({ studioData }: { studioData: StudioTypes }) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [amenities, setAmenities] = useState<string[]>(studioData.features);

    const [preset, setPreset] = useState(PRESET_IMAGES[1]);

    const toggleAmenity = (item: string) =>
        setAmenities((prev) =>
            prev.includes(item)
                ? prev.filter((a) => a !== item)
                : [...prev, item]
        );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true)
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries())

        const images = Object.entries(data).filter(([key, value]) => key.startsWith("images_"))
        const otherData = Object.fromEntries(Object.entries(data).filter(([key, value]) => !key.startsWith("images_")))
        const token = await getTokenForClient()
        const payload = { ...studioData, ...otherData, images, features: amenities };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            setIsSubmitting(false)
            showToast({ message: "Studio is Updated" })
            redirect("/my-listings")
        } else {
            setIsSubmitting(false)
            showToast({ message: "Studio is not updated successfully", type: "warning" })
        }
    };

    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 border-amber-300 px-2 text-xs text-amber-700 hover:bg-amber-50"
                    >
                        <Pencil size={13} />
                        Update
                    </Button>
                }
            />

            <DialogContent className="w-[calc(100%-1rem)] sm:max-w-2xl max-h-[90dvh] overflow-y-auto p-4 sm:p-6">

                <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're
                        done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title */}
                    <div>
                        <label className={labelClass}>Studio Title *</label>
                        <input
                            type="text"
                            defaultValue={studioData.title}
                            placeholder="e.g. The Greenpoint Daylight Infinity Cyclorama"
                            name="title"
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Category & Capacity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="min-w-0">
                            <label className={labelClass}>Category *</label>
                            <select
                                name="category"
                                className={`${inputClass} cursor-pointer`}
                                defaultValue={studioData.category}
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.name} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="min-w-0">
                            <label className={labelClass}>
                                <Users className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
                                Max Capacity *
                            </label>
                            <input
                                type="number"
                                required
                                defaultValue={studioData.max_capacity}
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
                        <div className="min-w-0">
                            <label className={labelClass}>
                                <DollarSign className="w-3.5 h-3.5 inline text-stone-400" />
                                Hourly Rate *
                            </label>
                            <input
                                type="number"
                                required
                                defaultValue={studioData.hourtlyRate}
                                min={10}
                                name="hourtlyRate"
                                placeholder="e.g. 110"
                                className={inputClass}
                            />
                        </div>

                        <div className="min-w-0">
                            <label className={labelClass}>
                                <DollarSign className="w-3.5 h-3.5 inline text-stone-400" />
                                Security Deposit *
                            </label>
                            <input
                                type="number"
                                required
                                defaultValue={studioData.deposit}
                                min={0}
                                name="deposit"
                                placeholder="e.g. 150"
                                className={inputClass}
                            />
                        </div>

                        <div className="min-w-0">
                            <label className={labelClass}>
                                <DollarSign className="w-3.5 h-3.5 inline text-stone-400" />
                                Cleaning Fee
                            </label>
                            <input
                                type="number"
                                defaultValue={studioData.cleaningFee}
                                min={0}
                                name="cleaningFee"
                                placeholder="e.g. 45"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Location & Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="min-w-0">
                            <label className={labelClass}>
                                <MapPin className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
                                City & Neighborhood *
                            </label>
                            <input
                                type="text"
                                required
                                defaultValue={studioData.location}
                                placeholder="e.g. Williamsburg, Brooklyn, NY"
                                name="location"
                                className={inputClass}
                            />
                        </div>

                        <div className="min-w-0">
                            <label className={labelClass}>Street Address</label>
                            <input
                                type="text"
                                defaultValue={studioData.address}
                                placeholder="e.g. 240 Kent Ave, 3rd Floor"
                                name="address"
                                className={inputClass}
                            />
                        </div>
                    </div>

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
                                defaultValue={studioData?.images[0][1]}
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
                                    defaultValue={studioData?.images[i + 1][1]}
                                    placeholder={`https://... or select preset below ${preset.label}`}
                                    className={`${inputClass} ${preset.label === p.label ? "block" : "hidden"}`}
                                />
                            ))}

                            <div className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-1">
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
                        <label className={`${labelClass} mb-2`}>
                            Amenities
                        </label>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {AMENITY_OPTIONS.map((item) => {
                                const checked = amenities.includes(item);

                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => toggleAmenity(item)}
                                        className={`flex items-center gap-2.5 p-2.5 text-xs rounded-xl border text-left transition-colors ${checked
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
                                            {checked && (
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            )}
                                        </div>

                                        <span className="truncate">{item}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Overview */}
                    <div>
                        <label className={labelClass}>
                            Detailed Overview *
                        </label>

                        <textarea
                            required
                            rows={4}
                            defaultValue={studioData.overview}
                            name="overview"
                            placeholder="Describe lighting, ceiling height, gear included, load-in rules, sound isolation, and nearby catering..."
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Buttons */}
                    <DialogFooter className="flex-col-reverse sm:flex-row gap-2 border-t border-stone-200 pt-4">
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-colors disabled:opacity-50"
                        >
                            <Sparkles className="w-4 h-4" />
                            {isSubmitting ? "Updating..." : "Update Studio Listing"}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
}
