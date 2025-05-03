// To display all ROOMS

import React from 'react'
import Link from 'next/link'
import SmallHeader from '@/components/building_page/SmallHeader'
import { getFloorName } from '@/libs/getNames'
import DeleteBtn from '@/components/building_page/DeleteBtn'

const page = async ({ params }) => {
  const { id: buildingId, floorId: floorId } = await params

  const data = await fetch(
    `http://localhost:3000/api/buildings/${buildingId}/${floorId}`
  )
  const rooms = await data.json()
  console.log(rooms)
  const floorName = await getFloorName(buildingId, floorId)
  return (
    <>
      <SmallHeader />
      <div className="flex justify-between items-center mb-[24px]">
        <h1 className="font-bold text-[24px] text-[#671EE1]">{floorName}</h1>
        <Link
          href={`/buildings/create-room?building_id=${buildingId}&floor_id=${floorId}`}
          className="flex items-center"
        >
          <p className="mr-[8px] text-[#671EE1] font-bold">Create Room</p>
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
            <div key={index} className="card">
              <Link href={`/buildings/${buildingId}/${floorId}/${room.id}`}>
                <img
                  src={room.img}
                  className="h-[152px] w-[253px] rounded-[16px] shadow-lg"
                />
                <div className="flex items-center justify-between mt-[16px]">
                  <p className=" font-bold">{room.name}</p>
                  <div className="flex items-center">
                    <img
                      src="/system-icons/bed.png"
                      className="w-[22px] mr-[8px]"
                    />
                    <p className="font-bold text-[#671EE1]">{room.capacity}</p>
                  </div>
                </div>
              </Link>
              <Link
                href={`/buildings/edit-room?building_id=${buildingId}&floor_id=${floorId}&room_id=${room.id}`}
                className="text-[#671EE1] font-bold hover:text-black flex  items-center mt-[8px] mb-[8px]"
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
              <DeleteBtn targetId={room.id} deletingFor={'rooms'} />
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default page
