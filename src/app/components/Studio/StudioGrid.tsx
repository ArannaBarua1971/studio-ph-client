import { StudioTypes } from '@/lib/types'
import StudioCard from './StudioCard'



function StudioGrid({studios}:{studios:StudioTypes[]}) {
  return (

    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10'>
      {
        studios.map((studio, index) => (
          <StudioCard key={index} studioData={studio} />
        ))
      }
    </div>
  )
}

export default StudioGrid
