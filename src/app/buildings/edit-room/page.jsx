import FloorEditForm from '@/components/building_page/forms/editForms/FloorEditForm'
import RoomEditForm from '@/components/building_page/forms/editForms/RoomEditForm'
import React from 'react'

const page = async ({ searchParams }) => {
  const id = await searchParams
  const floorId = id.floor_id
  const buildingId = id.building_id
  const roomId = id.room_id

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/rooms`, {
        cache: 'no-store', // optional: avoid caching issues
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log('Failed to fetch floor data')
      return []
    }
  }

  const roomData = await getData()
  const room = roomData.find((item) => String(item.id) === String(roomId))

  console.log(room)

  if (!room) {
    return <p>Room not found.</p>
  }

  return (
    <RoomEditForm
      name={room.name}
      img={room.img}
      roomId={room.id}
      buildingId={buildingId}
      floorId={floorId}
      capacity={room.capacity}
    />
  )
}

export default page
