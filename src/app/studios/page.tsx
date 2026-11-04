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
        <div className='px-87.5 my-10'>
            <header className='space-y-1 pt-10 pb-5'>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Peer-Reviewed Excellence</p>
                <h1 className='text-2xl sm:text-4xl font-display font-bold text-stone-900 mt-1'>6 Top Rated Studio Spaces</h1>
                <span className='mt-1 text-sm text-stone-500'> Consistently rated 4.9+ by verified directors, fashion stylists, and sound recordists.</span>
            </header>
            <StudioGrid studios={data.data} />
        </div>
    )
}

export default page
