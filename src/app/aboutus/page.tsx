import Link from "next/link";
import { Clock, Headphones, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: UserCheck,
    title: "Verified Hosts & Creators",
    description:
      "Every host and creator profile is checked, so both sides book with confidence.",
  },
  {
    icon: Clock,
    title: "Transparent Hourly Pricing",
    description:
      "Pick your date, start time, and duration and see the exact cost before you book.",
  },
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description:
      "Property and casualty coverage backs every scheduled production session.",
  },
  {
    icon: Headphones,
    title: "24/7 Production Support",
    description:
      "Live dispatch help for access, power, or schedule changes on shoot day.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Header */}
      <section className="border-b border-white/10 bg-[#1c1917] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
            About StudioSpace
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Where Vision Meets Production Space.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            StudioSpace connects creators with daylight cycloramas, acoustic
            film stages, podcast suites, and mastering rooms, rented by the hour
            from verified hosts.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#faf9f7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-600">
              Our mission
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Production spaces open to every creator
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
            <p>
              Finding the right space for a shoot or recording should not take
              weeks of calls and guesswork. StudioSpace puts lighting gear,
              acoustic ratings, ceiling heights, and capacity in one place so
              you can compare spaces and book in minutes.
            </p>
            <p>
              Hosts get verified creators and full liability protection. Creators
              get clear hourly pricing and support from search to shoot.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#faf9f7] px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              What We Stand For
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs text-neutral-500 sm:text-sm">
              The standards behind every space on StudioSpace.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="rounded-2xl border-neutral-200 bg-white py-0 shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-900">
                    <Icon className="size-[18px]" />
                  </div>
                  <h3 className="mt-5 text-sm font-bold text-neutral-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1c1917] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to create?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              Find a space for your next shoot, or list your own and start
              hosting.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <Button
              variant="outline"
              className="h-11 rounded-xl border-white/25 bg-transparent px-5 text-xs font-semibold text-neutral-200 hover:bg-white/5 hover:text-white"
            >
              <Link href="/studios">Explore Studios</Link>
            </Button>
           
          </div>
        </div>
      </section>
    </main>
  );
}