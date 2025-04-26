import FloorEditForm from '@/components/building_page/forms/editForms/FloorEditForm'
import React from 'react'

const page = async ({ searchParams }) => {
  const id = await searchParams
  const floorId = id.floor_id
  const buildingId = id.building_id

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/floors`, {
        cache: 'no-store', // optional: avoid caching issues
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log('Failed to fetch floor data')
      return []
    }
  }

  const floorData = await getData()
  const floor = floorData.find((item) => String(item.id) === String(floorId))

  console.log(floor)

  if (!floor) {
    return <p>Floor not found.</p>
  }

  return (
    <FloorEditForm
      name={floor.name}
      img={floor.img}
      floorId={floor.id}
      buildingId={buildingId}
    />
  )
}

export default page
