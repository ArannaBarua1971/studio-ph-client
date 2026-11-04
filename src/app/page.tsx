import CategoryGrid from "./components/Category/CategoryGrid";
import HomeBanner from "./components/HomeBanner";
import StudioGrid from "./components/Studio/StudioGrid";

export default async function Home() {
  const studioRes = await fetch(`http://localhost:5000/studios`);
  const studioData = await studioRes.json()
  const categoryRes = await fetch(`http://localhost:5000/category`);
  const cateRoryData=await categoryRes.json()
  return (
    <div>
      <HomeBanner />
      <div className="px-[350px]">
        <div >
          <header className='space-y-1 pt-10 pb-5'>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Vetted Spatial Architecture</p>
            <h1 className='text-2xl sm:text-4xl font-display font-bold text-stone-900 mt-1'>Browse Workspaces by Category</h1>
            <span className='mt-1 text-sm text-stone-500'> Select your production medium to explore specialized acoustic and daylight environments.</span>
          </header>
          <CategoryGrid categories={cateRoryData.data.slice(0,3)}/>
        </div>

        <div>
          <header className='space-y-1 pt-10 pb-5'>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Peer-Reviewed Excellence</p>
            <h1 className='text-2xl sm:text-4xl font-display font-bold text-stone-900 mt-1'>6 Top Rated Studio Spaces</h1>
            <span className='mt-1 text-sm text-stone-500'> Consistently rated 4.9+ by verified directors, fashion stylists, and sound recordists.</span>
          </header>
          <StudioGrid studios={studioData.data.slice(0,6)}/>
        </div>
      </div>
    </div>
  );
}
