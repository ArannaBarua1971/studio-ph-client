"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  Heart,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react"

import { cn } from "cn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { StudioTypes } from "@/lib/types"




export default function StudioCard({ studioData }: { studioData: StudioTypes }) {
  const [favorited, setFavorited] = React.useState(false)



  return (
      <Card
        className="group w-full  gap-0 overflow-hidden rounded-3xl border-border/60 p-0 shadow-lg"

      >
        {/* Media */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={studioData?.images[0][1]}
            alt={ studioData.title}
            sizes="(min-width: 640px) 400px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />

          {/* Top-left badges */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <Badge className="rounded-lg border-0 bg-black/70 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-black/70">
              {studioData.category}
            </Badge>
            {/* {studioData.verified && (
              <Badge className="gap-1.5 rounded-lg border-0 bg-amber-400 px-3 py-1.5 text-sm font-semibold text-neutral-900 hover:bg-amber-400">
                <ShieldCheck className="size-3.5" />
                Verified
              </Badge>
            )} */}
          </div>

          {/* Favorite */}
          <Button
            type="button"
            size="icon"
            variant="secondary"
            aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
            aria-pressed={favorited}
            className="absolute right-3 top-3 size-10 rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-black/70"
          >
            <Heart
              className={cn(
                "size-5 transition-colors",
                favorited && "fill-rose-500 text-rose-500"
              )}
            />
          </Button>

          {/* Bottom overlays */}
          {/* <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
            <div className="flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 text-white backdrop-blur-sm">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold">{Number(studioData).toFixed(2)}</span>
              <span className="text-xs text-white/70">({studioData.reviewCount})</span>
            </div>
            <div className="rounded-lg bg-black/70 px-2.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {studioData.sqft.toLocaleString()} sq ft
            </div>
          </div> */}
        </div>

        {/* Details */}
        <CardContent className="space-y-3 px-5 pb-5 pt-5">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 text-amber-500" />
            <span>{studioData.location}</span>
          </div>

          <h3 className="text-xl font-bold leading-snug tracking-tight">
            {studioData.title}
          </h3>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-md px-2.5 py-1 text-sm font-normal text-muted-foreground"
            >
              <Users className="size-3.5" />
              Max {studioData.max_capacity}
            </Badge>
            {studioData?.features?.slice(0,2).map((feature) => (
              <Badge
                key={feature}
                variant="secondary"
                className="max-w-[210px] gap-1.5 rounded-md px-2.5 py-1 text-sm font-normal text-muted-foreground"
              >
                <Zap className="size-3.5 shrink-0 fill-amber-400 text-amber-500" />
                <span className="truncate">{feature}</span>
              </Badge>
            ))}
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="mx-5 items-end justify-between border-t px-0 pb-5 pt-4">
          <div>
            <p className="text-3xl font-bold leading-none tracking-tight">
              ${studioData.hourtlyRate}
              <span className="ml-1 text-base font-normal text-muted-foreground">
                / hr
              </span>
            </p>
            {studioData.deposit != null && (
              <p className="mt-2 text-xs text-muted-foreground">
                ${studioData.deposit} refundable deposit
              </p>
            )}
          </div>

          <Link
            href={`/studios/${studioData._id}`}
            className="h-11 rounded-xl px-5 font-semibold"
          >
              View Details
              <ArrowUpRight className="size-4" />
          </Link>
        </CardFooter>
      </Card>
  )
}