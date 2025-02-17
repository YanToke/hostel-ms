import React from 'react'
import Link from 'next/link'

const RoomCardContainer = ({ rooms, floorName, buildingId, floorId }) => {
  return (
    <div className="mt-[48px] mb-[40px]">
      <div className="flex justify-between items-center mb-[24px]">
        <h1 className="font-bold text-[24px] text-[#4F378B]">{floorName}</h1>
        <Link href={`/buildings/create-room?floor_id=${floorId}`} className="flex items-center">
          <p className="mr-[8px]">Create Room</p>
          <img
            src="/system-icons/plus-circle.png"
            className="w-[24px] h-[24px]"
          />
        </Link>
      </div>
      <div className="flex gap-[24px]">
        {rooms.map((room, index) => (
          <Link
            key={index}
            href={`/buildings/${buildingId}/${room.room_id}`}
            className="w-[253px] h-[192px]"
          >
            <img
              src={room.room_img}
              className="h-[152px] w-[253px] rounded-[16px] shadow-lg"
            />
            <p className="mt-[16px] font-bold">{room.room_name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RoomCardContainer
