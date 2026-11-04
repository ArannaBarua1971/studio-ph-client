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
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-white/15 bg-black/40 px-4 py-2 text-xs font-medium text-amber-400 backdrop-blur-md"
          >
            <Sparkles className="size-3.5" />
            Production Space Network &amp; Reservations
          </Badge>

          <div
            role="radiogroup"
            aria-label="Lighting mood"
            className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/40 p-1 backdrop-blur-md"
          >
            <span className="px-3 text-xs text-white/60">Lighting Mood:</span>
            {MOODS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={mood === id}
                onClick={() => setMood(id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
                  mood === id
                    ? "bg-amber-400 text-neutral-950"
                    : "text-white/70 hover:text-white"
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

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

            {/* Search bar */}
            <form
              onSubmit={onSearch}
              className="mt-10 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/50 p-3 backdrop-blur-xl sm:flex-row sm:items-stretch"
            >
              <Field icon={<Search className="size-4" />} label="Category" className="sm:flex-[1.3]">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-auto w-full border-0 bg-transparent p-0 text-sm font-semibold text-white shadow-none focus:ring-0 focus-visible:ring-0 [&_svg]:text-white/70">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field icon={<MapPin className="size-4" />} label="Location" className="sm:flex-[1.3]">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Brooklyn, LA, Austin…"
                  className="h-auto border-0 bg-transparent p-0 text-sm text-white shadow-none placeholder:text-white/35 focus-visible:ring-0"
                />
              </Field>

              <Field icon={<DollarSign className="size-4" />} label="Max $/hr" className="sm:flex-1">
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Budget"
                  className="h-auto border-0 bg-transparent p-0 text-sm text-white shadow-none placeholder:text-white/35 focus-visible:ring-0"
                />
              </Field>

              <Button
                type="submit"
                className="h-auto rounded-xl bg-amber-400 px-8 py-4 text-sm font-semibold text-neutral-950 hover:bg-amber-300"
              >
                Search
                <ArrowRight className="size-4" />
              </Button>
            </form>

            {/* Trending */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="mr-1 text-white/45">Trending:</span>
              {TRENDING.map((t) => (
                <Link
                  key={t}
                  href={`/explore?q=${encodeURIComponent(t)}`}
                  className="rounded-md border border-white/10 bg-black/30 px-3 py-1.5 text-white/65 transition-colors hover:border-amber-400/50 hover:text-amber-300"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          {/* Right column */}
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