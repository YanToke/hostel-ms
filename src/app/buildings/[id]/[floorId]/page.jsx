import React from 'react'
import Link from 'next/link'
import SmallHeader from '@/components/building_page/SmallHeader'
import { getFloorName } from '@/libs/getNames'

const page = async ({ params }) => {
  const { id: buildingId, floorId: floorId } = await params

  const data = await fetch(
    `http://localhost:3000/api/buildings/${buildingId}/${floorId}`
  )
  const rooms = await data.json()
  console.log(rooms)
  const floorName = await getFloorName(buildingId , floorId )
  return (
    <>
      <SmallHeader />
      <div className="flex justify-between items-center mb-[24px]">
        <h1 className="font-bold text-[24px] text-[#4F378B]">{floorName}</h1>
        <Link
          href={`/buildings/create-room?floor_id=${floorId}`}
          className="flex items-center"
        >
          <p className="mr-[8px]">Create Room</p>
          <img
            src="/system-icons/plus-circle.png"
            className="w-[24px] h-[24px]"
          />
        </Link>
      </div>

      <div className="flex gap-[24px]">
        {rooms.length <= 0 ? (
          <p>No Room Availabe</p>
        ) : (
          rooms.map((room, index) => (
            <Link
              key={index}
              href={`/buildings/${buildingId}/${floorId}/${room.id}`}
              className="w-[253px] h-[192px]"
            >
              <img
                src={room.img}
                className="h-[152px] w-[253px] rounded-[16px] shadow-lg"
              />
              <p className="mt-[16px] font-bold">{room.name}</p>
            </Link>
          ))
        )}
      </div>
    </>
  )
}

export default page
