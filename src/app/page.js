import { getBuildingInformationsById } from "@/models/Building"

export default async function Home() {
  const binfo = await getBuildingInformationsById(2);
  console.log(binfo);
  console.log();
  return (
    <>Home</>
  )
}
