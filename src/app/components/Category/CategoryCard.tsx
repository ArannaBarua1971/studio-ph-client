import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {CATEGORIES} from "@/lib/adminData/studio"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
export type CategoryData = {
  _id: string 
  count: number
}



export function CategoryCard({ categoryData}:{categoryData:CategoryData }) {

  const image=CATEGORIES.find(({name,image})=> name==categoryData._id)
  return (
    <Link
      href={`/studios?category=${categoryData._id}`}
      className={cn(
        "group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-900 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      {/* Background photo */}
      <img
        src={image?.image}
        alt={categoryData._id}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent opacity-85 transition-opacity group-hover:opacity-75" />

      {/* Foreground */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 text-white sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <Badge className="rounded-full border border-stone-700/60 bg-stone-900/80 px-2.5 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md hover:bg-stone-900/80 sm:px-3 sm:text-xs">
            {categoryData.count}+ spaces listed
          </Badge>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors group-hover:bg-amber-400 group-hover:text-stone-950">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-amber-400 sm:text-xl">
            {categoryData._id}
          </h3>
          {/* <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-300">
            {categoryData.description}
          </p> */}
        </div>
      </div>
    </Link>
  )
}