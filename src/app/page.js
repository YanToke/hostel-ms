import { getAllBuildings } from '@/models/Building'

export default async function Home() {
  const buildings = await getAllBuildings()
  console.log(buildings)
  return <>Home</>
}
