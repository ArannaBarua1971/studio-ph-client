import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "1. Discover Spaces",
    description:
      "Filter by production type, lighting gear, acoustic ratings, ceiling heights, and verified guest capacity.",
  },
  {
    number: "02",
    title: "2. Select Shoot Hours",
    description:
      "Pick your exact production date, start time, load-in buffer, and duration with transparent hourly calculations.",
  },
  {
    number: "03",
    title: "3. Book Instantly",
    description:
      'Save your reservation in the MongoDB bookings collection with status "Pending" and prompt host verification.',
  },
  {
    number: "04",
    title: "4. Create & Produce",
    description:
      "Check in seamlessly with keyless codes or on-site studio managers, use production gear, and produce your best work.",
  },
];

export default function HowBookingWorks() {
  return (
    <section id="howworks">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-600">
            Clear, transparent production lifecycle
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900">
            How Booking Works
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-neutral-500">
            From search to shoot in 4 straightforward steps with verified host
            confirmation.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Card
              key={step.number}
              className="rounded-2xl border-neutral-200 bg-white py-0 shadow-sm"
            >
              <CardContent className="p-6">
                <div className="grid size-10 place-items-center rounded-xl bg-amber-100 text-sm font-bold text-amber-900">
                  {step.number}
                </div>
                <h3 className="mt-5 text-sm font-bold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}