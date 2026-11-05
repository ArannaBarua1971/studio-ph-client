import StudioGrid from '../components/Studio/StudioGrid'

async function page({ searchParams }: { searchParams: Promise<{ category: string }> }) {
    const params = await searchParams;
    let res;
    if (params.category) {
        res = await fetch(`http://localhost:5000/studios/${params.category}`);
    }else{
        res = await fetch(`http://localhost:5000/studios`);
    }
    const data = await res.json()
    return (
        <div className='mx-auto my-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
            <header className='space-y-1 pt-6 pb-5 sm:pt-10'>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Peer-Reviewed Excellence</p>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-stone-900 mt-1'>6 Top Rated Studio Spaces</h1>
                <span className='mt-1 block text-sm text-stone-500'> Consistently rated 4.9+ by verified directors, fashion stylists, and sound recordists.</span>
            </header>
            <StudioGrid studios={data.data} />
        </div>
    )
}

export default page
