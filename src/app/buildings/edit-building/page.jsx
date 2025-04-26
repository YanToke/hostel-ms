import BuildingEditForm from '@/components/building_page/forms/editForms/BuildingEditForm'
import React from 'react'

const page = async ({ searchParams }) => {
  const id = await searchParams
  const buildingId = id.building_id

  const getBuildingData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/buildings`, {
        cache: 'no-store', // optional: avoid caching issues
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log('Failed to fetch building data')
      return []
    }
  }

  const buildingData = await getBuildingData()
  const building = buildingData.find(
    (item) => String(item.id) === String(buildingId)
  )

  console.log(building)

  if (!building) {
    return <p>Building not found.</p>
  }

  return (
    <BuildingEditForm
      name={building.name}
      img={building.img}
      id={building.id}
    />
  )
}

export default page
