import React from 'react'
import { CategoryCard } from './CategoryCard'

// data/categories.ts

export type CategoryData = {
  _id: string 
  count: number
}


function CategoryGrid({categories}:{categories:CategoryData[]}) {
  return (

    <div className='grid grid-cols-3 gap-3'>

      {
        categories.map(category => (

          <CategoryCard key={category._id} categoryData={category} />
        ))
      }
    </div>

  )
}

export default CategoryGrid

