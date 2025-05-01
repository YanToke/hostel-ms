export const getBuildingName = async (id) => {
  if (!id) return null
  try {
    const data = await fetch(`http://localhost:3000/api/buildings`)
    const buildings = await data.json()
    const building = buildings.find((b) => b.id.toString() === id)
    return building?.name || null
  } catch (e) {
    console.error('Error fetching building:', e)
    return null
  }
}

export const getFloorName = async (buildingId, floorId) => {
  if (!buildingId || !floorId) return null
  try {
    const data = await fetch(
      `http://localhost:3000/api/buildings/${buildingId}`
    )
    const floors = await data.json()
    const floor = floors.find((f) => f.id.toString() === floorId)
    return floor?.name || null
  } catch (e) {
    console.error('Error fetching floor:', e)
    return null
  }
}

export const getRoomName = async (buildingId, floorId, roomId) => {
  if (!buildingId || !floorId || !roomId) return null
  try {
    const data = await fetch(
      `http://localhost:3000/api/buildings/${buildingId}/${floorId}`
    )
    const rooms = await data.json()
    const room = rooms.find((r) => r.id.toString() === roomId)
    return room?.name || null
  } catch (e) {
    console.error('Error fetching room:', e)
    return null
  }
}
