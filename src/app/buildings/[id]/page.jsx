import { getBuildingName } from '@/libs/getNames'
import Link from 'next/link'

const Page = async ({ params }) => {
  const { id: buildingId } = await params
  const data = await fetch(`http://localhost:3000/api/buildings/${buildingId}`)
  const building = await data.json()

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-[40px] mt-[40px]">
          <h1 className="text-[32px] font-bold ">Thu Thet Thar</h1>
          <Link href={'/buildings'} className="font-bold">
            Back
          </Link>
        </div>

        <div className="flex justify-between items-center mb-[24px]">
          <h1 className="font-bold text-[24px] text-[#4F378B]">
            {getBuildingName(buildingId)}
          </h1>
          <Link
            href={`/buildings/create-floor?building_id=${buildingId}`}
            className="flex items-center"
          >
            <p className="mr-[8px]">Create Floor</p>
            <img
              src="/system-icons/plus-circle.png"
              className="w-[24px] h-[24px]"
            />
          </Link>
        </div>

        <div className="flex gap-[16px] flex-wrap">
          {building.map((floor, index) => (
            <Link
              href={`/buildings/${buildingId}/${floor.floor_id}`}
              key={index}
              className="w-[253px] h-[192px] cursor-pointer"
            >
              <img
                src={floor.floor_img}
                className={`h-[152px] w-[253px] rounded-[16px] shadow-lg`}
              />
              <p className="mt-[16px] font-bold">{floor.floor_name}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Page
