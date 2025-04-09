export const getBuildingName = async (id) => {
  const data = await fetch(`http://localhost:3000/api/buildings`)
  const buildings = await data.json()
  const building = buildings.find((b) => b.id.toString() === id)
  return building.name
}

export const getFloorName = async (buildingId, floorId) => {
  const data = await fetch(`http://localhost:3000/api/buildings/${buildingId}`)
  const floors = await data.json()
  const floor = floors.find((f) => f.id.toString() === floorId)
  return floor.name
}

export const getRoomName = async (buildingId, floorId, roomId) => {
  console.log(buildingId)
  console.log(floorId)
  console.log(roomId)
  const data = await fetch(
    `http://localhost:3000/api/buidings/${buildingId}/${floorId}`
  )
  const rooms = await data.json()
  const room = rooms.find((r) => r.id.toString() === roomId)
  return room.name
}
