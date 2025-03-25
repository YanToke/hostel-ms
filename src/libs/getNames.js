export const getBuildingName = async (id) => {
  const data = await fetch(`http://localhost:3000/api/buildings`)
  const buildings = await data.json()
  const building = buildings.find((b) => b.id.toString() === id)
  return building.name
}
