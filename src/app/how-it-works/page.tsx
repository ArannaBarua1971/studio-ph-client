// app/components/HowItWorks.tsx
import Link from "next/link";
import {
  Search,
  CalendarCheck,
  CreditCard,
  Camera,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Step = { title: string; description: string; icon: LucideIcon };

const STEPS: Step[] = [
  {
    title: "Find Your Space",
    description:
      "Browse photo lofts, film stages, podcast lounges, and music suites. Filter by category, location, and price.",
    icon: Search,
  },
  {
    title: "Check & Request",
    description:
      "View amenities, gallery, and rates. Pick your date and hours, then send a booking request to the host.",
    icon: CalendarCheck,
  },
  {
    title: "Confirm & Pay",
    description:
      "Once the host approves, pay securely. The security deposit is held and returned after your session.",
    icon: CreditCard,
  },
  {
    title: "Show Up & Create",
    description:
      "Arrive at your booked time and start your shoot, recording, or rehearsal. Everything is ready for you.",
    icon: Camera,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-stone-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-1 sm:text-3xl">
            Book a Creative Studio in 4 Simple Steps
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            From searching to shooting, the whole process takes just a few minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* connector line (desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] border-t-2 border-dashed border-amber-300" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group relative bg-white rounded-2xl border border-stone-200 shadow-sm p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-amber-400"
              >
                {/* number badge */}
                <span className="absolute top-4 right-4 text-[11px] font-bold text-stone-300 group-hover:text-amber-500 transition-colors">
                  0{i + 1}
                </span>

                {/* icon */}
                <div className="relative z-10 w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center ring-4 ring-white transition-colors group-hover:bg-amber-400 group-hover:text-stone-950">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="mt-4 text-base font-bold text-stone-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Host CTA */}
        <div className="mt-10 rounded-2xl bg-stone-900 border border-stone-800 p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Own a studio space?</h3>
            <p className="text-xs text-stone-400 mt-1">
              List it in minutes and start earning from production crews and creators.
            </p>
          </div>
          <Link
            href="/add-studio"
            className="inline-flex w-full items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-colors shrink-0 sm:w-auto"
          >
            List Your Studio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}