import React from 'react'
import Link from 'next/link'
import SmallHeader from '@/components/building_page/SmallHeader'

const page = async ({ params }) => {
  const { id: buildingId, floorId: floorId } = await params

  const data = await fetch(`http://localhost:3000/api/buildings/${buildingId}`)
  const building = await data.json()
  const floor = building.find((b) => b.floor_id.toString() === floorId)

  return (
    <>
      <SmallHeader />
      <div className="flex justify-between items-center mb-[24px]">
        <h1 className="font-bold text-[24px] text-[#4F378B]">
          {floor.floor_name}
        </h1>
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
        {floor.rooms.length <= 0 ? (
          <p>No Room Availabe</p>
        ) : (
          floor.rooms.map((room, index) => (
            <Link
              key={index}
              href={`/buildings/${buildingId}/${floorId}/${room.room_id}`}
              className="w-[253px] h-[192px]"
            >
              <img
                src={room.room_img}
                className="h-[152px] w-[253px] rounded-[16px] shadow-lg"
              />
              <p className="mt-[16px] font-bold">{room.room_name}</p>
            </Link>
          ))
        )}
      </div>
    </>
  )
}

export default page
