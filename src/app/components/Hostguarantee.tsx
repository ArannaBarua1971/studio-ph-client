import Link from "next/link";
import { Headphones, ShieldCheck, UserCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HostGuarantee() {
  return (
    <>
      {/* Banner */}
      <section className="border-b border-white/10 bg-[#1c1917] px-6 py-16 mt-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
              Full production insurance included
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Host Guarantee &amp; Creator Support
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              Platform assurances covering $1,000,000 liability protection,
              verified profiles, equipment safety checklists, and 24/7 host
              dispatch support on your shoot day.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <Button
              variant="outline"
              className="h-11 rounded-xl border-white/25 bg-transparent px-5 text-xs font-semibold text-neutral-200 hover:bg-white/5 hover:text-white"
            >
              <Link href="#howworks">Learn About Coverage</Link>
            </Button>
            <Button
              className="h-11 rounded-xl bg-amber-400 px-6 text-sm font-bold text-black hover:bg-amber-300"
            >
              <Link href="/add-studio">List Your Space</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}