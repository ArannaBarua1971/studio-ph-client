import CategoryGrid from "./components/Category/CategoryGrid";
import HomeBanner from "./components/HomeBanner";
import HostGuarantee from "./components/Hostguarantee";
import HowBookingWorks from "./components/Studio/HowBookingWorks";
import StudioGrid from "./components/Studio/StudioGrid";

export default async function Home() {
  const studioRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`);
  const studioData = await studioRes.json();
  const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
  const cateRoryData = await categoryRes.json();
  console.log(cateRoryData)
  return (
    <div>
      <HomeBanner />

      {/* Fluid container: 16px on phones, up to 32px on desktop, capped at 1280px */}
      <div className="mx-auto my-10 flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 md:my-14 md:gap-14 lg:px-8">
        <section>
          <header className="space-y-1 pb-5 sm:pb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
              Vetted Spatial Architecture
            </p>
            <h2 className="font-display text-2xl font-bold text-stone-900 sm:text-3xl lg:text-4xl">
              Browse Workspaces by Category
            </h2>
            <p className="max-w-2xl text-sm text-stone-500">
              Select your production medium to explore specialized acoustic and
              daylight environments.
            </p>
          </header>
          <CategoryGrid categories={cateRoryData.data.slice(0, 3)} />
        </section>

        <section>
          <header className="space-y-1 pb-5 sm:pb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
              Peer-Reviewed Excellence
            </p>
            <h2 className="font-display text-2xl font-bold text-stone-900 sm:text-3xl lg:text-4xl">
              6 Top Rated Studio Spaces
            </h2>
            <p className="max-w-2xl text-sm text-stone-500">
              Consistently rated 4.9+ by verified directors, fashion stylists,
              and sound recordists.
            </p>
          </header>
          <StudioGrid studios={studioData.data.slice(0, 6)} />
        </section>
      </div>

      {/* Full-width sections handle their own background and max-width */}
      <HowBookingWorks />
      <HostGuarantee />
    </div>
  );
}