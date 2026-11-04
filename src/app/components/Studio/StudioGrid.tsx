import { StudioTypes } from '@/lib/types'
import StudioCard from './StudioCard'



function StudioGrid({studios}:{studios:StudioTypes[]}) {
  return (

    <div className='grid grid-cols-3 gap-10'>
      {
        studios.map((studio, index) => (
          <StudioCard key={index} studioData={studio} />
        ))
      }
    </div>
  )
}

export default StudioGrid
