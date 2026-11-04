"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  DollarSign,
  Flame,
  MapPin,
  Search,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const MOODS = [
  {
    id: "daylight",
    label: "Daylight",
    icon: Sun,
    tint: "from-transparent to-transparent",
  },
  {
    id: "golden",
    label: "Golden Hour",
    icon: Flame,
    tint: "from-amber-500/25 via-orange-600/10 to-transparent",
  },
  {
    id: "rgb",
    label: "Cine RGB",
    icon: Zap,
    tint: "from-fuchsia-600/30 via-indigo-600/20 to-cyan-500/20",
  },
] as const

type MoodId = (typeof MOODS)[number]["id"]

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "photo", label: "Photo Studios" },
  { value: "podcast", label: "Podcast Suites" },
  { value: "film", label: "Film Stages" },
  { value: "mastering", label: "Mastering Rooms" },
]

const TRENDING = [
  "Daylight Lofts",
  "Soundproof Stages",
  "4K Podcast Suites",
  "Sprung Dance Floors",
]

export default function HeroBanner() {
  const router = useRouter()
  const [mood, setMood] = React.useState<MoodId>("daylight")
  const [category, setCategory] = React.useState("all")
  const [location, setLocation] = React.useState("")
  const [budget, setBudget] = React.useState("")

  const activeTint = MOODS.find((m) => m.id === mood)!.tint

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (category !== "all") params.set("category", category)
    if (location.trim()) params.set("location", location.trim())
    if (budget) params.set("maxRate", budget)
    router.push(`/explore?${params.toString()}`)
  }

  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      {/* Background photo, desaturated */}
      <Image
        src="/images/hero-studio.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover grayscale"
      />
      <div className="absolute inset-0 -z-20 bg-neutral-950/80" />
      {/* Lighting mood tint */}
      <div
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-br mix-blend-screen transition-all duration-700",
          activeTint
        )}
      />

      <div className=" px-6 py-14 lg:py-16">


        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14">
          {/* Left column */}
          <div className="lg:pt-12">
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Where Vision Meets Production Space.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Rent world-class daylight infinity cycloramas, acoustic film
              stages, podcast suites, and mastering rooms by the hour with
              guaranteed host liability protection.
            </p>

            <p className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-400">
              <span className="size-1.5 rounded-full bg-amber-400" />
              5600K High-CRI natural diffuse daylight through steel industrial
              windows
            </p>



            <Link
              href={"/studios"}
              className="flex w-[10%] justify-center items-center mt-2 rounded-xl bg-amber-400 px-8 py-4 text-sm font-semibold text-neutral-950 hover:bg-amber-300"
            >
              Explore
              <ArrowRight className="size-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

function Field({
  icon,
  label,
  children,
  className,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-neutral-950/70 px-4 py-3 focus-within:border-amber-400/50",
        className
      )}
    >
      <span className="text-white/60">{icon}</span>
      <div className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-white/50">
          {label}
        </span>
        {children}
      </div>
    </div>
  )
}