// To Display All FLOORS

import { getBuildingName } from '@/libs/getNames'
import Link from 'next/link'
import DeleteBtn from '@/components/building_page/DeleteBtn'

const Page = async ({ params }) => {
  const { id: buildingId } = await params
  const data = await fetch(`http://localhost:3000/api/buildings/${buildingId}`)
  const building = await data.json()
  console.log(building)

  const buildingName = await getBuildingName(buildingId)
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
            {buildingName}
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
            <div key={index}>
              <Link
                href={`/buildings/${buildingId}/${floor.id}`}
                className="w-[253px] h-[192px] cursor-pointer"
              >
                <img
                  src={floor.img}
                  className={`h-[152px] w-[253px] rounded-[16px] shadow-lg`}
                />
                <div>
                  <p className="mt-[16px] font-bold">{floor.name}</p>
                </div>
              </Link>
              <Link
                href={`/buildings/edit-floor?building_id=${buildingId}&floor_id=${floor.id}`}
                className="text-[#4F378B] font-bold hover:text-black flex  items-center mt-[8px] mb-[8px]"
              >
                <img
                  src="/system-icons/square-pen.png"
                  className="w-[18px] mr-[8px]"
                />
                Edit
              </Link>

              {/*
              targetId = "the id of the building, floor or room"
              deletingFor = "variable for api route"
                            its value can be "buildings", "floors", "rooms"
            */}
              <DeleteBtn targetId={floor.id} deletingFor={'floors'} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Page
