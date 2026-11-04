"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
} from "lucide-react"

import { cn } from "@/lib/utils"



export default function HeroBanner() {

  return (
    <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-neutral-950 text-white">
      {/* Background photo, desaturated */}
      <img
        src="https://images.unsplash.com/photo-1617463874381-85b513b3e991?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        alt=""
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center grayscale"
      />

      {/* Dark base so text stays readable */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-neutral-950 via-neutral-950/55 to-neutral-950/20" />

      {/* Daylight beam falling in from the upper right window */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 -z-10 h-[140%] w-[70%] origin-top-right -rotate-[18deg] bg-gradient-to-b from-amber-100/30 via-amber-100/10 to-transparent blur-2xl"
      />

      {/* Steel window mullions casting shadow lines across the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:25%_33.333%] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-px bg-gradient-to-b from-amber-300/60 via-white/10 to-transparent"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-20">
        {/* Left: headline + copy + CTA */}
        <div>
          <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.03em] sm:text-7xl lg:text-8xl">
            Where Vision Meets
            <span className="block text-white/45">Production Space.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
            Rent world-class daylight infinity cycloramas, acoustic film
            stages, podcast suites, and mastering rooms by the hour with
            guaranteed host liability protection.
          </p>

          <Link
            href="/studios"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-amber-400 py-2 pl-8 pr-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            Explore Studios
            <span className="grid size-10 place-items-center rounded-full bg-neutral-950 text-amber-400 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>

        {/* Right: light reading card */}
        <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-md lg:mb-1">
          <p className="flex items-center gap-2 text-xs font-medium text-amber-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
            </span>
            5600K High-CRI natural diffuse daylight through steel industrial
            windows
          </p>

          {/* Colour temperature scale with marker at 5600K */}
          <div className="mt-5">
            <div className="relative h-1.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-200 to-sky-300">
              <span className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neutral-950 bg-white shadow-[0_0_0_3px_rgba(251,191,36,0.5)] [left:72%]" />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-white/45">
              <span>2700K</span>
              <span>6500K</span>
            </div>
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