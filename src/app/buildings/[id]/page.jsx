'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation' // Import useRouter and useSearchParams
import RoomCardContainer from '@/components/building_page/RoomCardContainer'

const page = ({ params }) => {
  const [buildingId, setBuildingId] = useState('')
  const [rooms, setRooms] = useState([])
  const [floorName, setFloorName] = useState('')
  const [activeFloor, setActiveFloor] = useState(null) // Track active floor index

  const router = useRouter()
  const searchParams = useSearchParams() // Access query parameters

  const boyRooms = [
    {
      floor_id: 1,
      floor_name: 'first floor',
      floor_img: '/floor.jpg',
      rooms: [
        { room_id: 1, room_name: 'room 1', room_img: '/room.jpg' },
        { room_id: 2, room_name: 'room 2', room_img: '/room.jpg' },
        { room_id: 3, room_name: 'room 3', room_img: '/room.jpg' },
        { room_id: 4, room_name: 'room 4', room_img: '/room.jpg' },
      ],
    },
    {
      floor_id: 2,
      floor_name: 'second floor',
      floor_img: '/floor.jpg',
      rooms: [
        { room_id: 1, room_name: 'room 1', room_img: '/room.jpg' },
        { room_id: 2, room_name: 'room 2', room_img: '/room.jpg' },
        { room_id: 3, room_name: 'room 3', room_img: '/room.jpg' },
        { room_id: 4, room_name: 'room 4', room_img: '/room.jpg' },
      ],
    },
    {
      floor_id: 3,
      floor_name: 'third floor',
      floor_img: '/floor.jpg',
      rooms: [
        { room_id: 1, room_name: 'room 1', room_img: '/room.jpg' },
        { room_id: 2, room_name: 'room 2', room_img: '/room.jpg' },
        { room_id: 3, room_name: 'room 3', room_img: '/room.jpg' },
      ],
    },
    {
      floor_id: 4,
      floor_name: 'fourth floor',
      floor_img: '/floor.jpg',
      rooms: [
        { room_id: 1, room_name: 'room 1', room_img: '/room.jpg' },
        { room_id: 2, room_name: 'room 2', room_img: '/room.jpg' },
        { room_id: 3, room_name: 'room 3', room_img: '/room.jpg' },
        { room_id: 4, room_name: 'room 4', room_img: '/room.jpg' },
      ],
    },
    {
      floor_id: 5,
      floor_name: 'fifth floor',
      floor_img: '/floor.jpg',
      rooms: [
        { room_id: 1, room_name: 'room 1', room_img: '/room.jpg' },
        { room_id: 2, room_name: 'room 2', room_img: '/room.jpg' },
        { room_id: 3, room_name: 'room 3', room_img: '/room.jpg' },
      ],
    },
  ]

  useEffect(() => {
    // Extract buildingId from params
    const getParams = async () => {
      const buildingId = await params
      setBuildingId(buildingId.id)
    }
    getParams()

    // Extract active floor index from URL and set the initial state
    const floorIndex = searchParams.get('floor') // Get 'floor' from query
    if (floorIndex !== null) {
      const index = parseInt(floorIndex)
      setFloorName(boyRooms[index]?.floor_name)
      setRooms(boyRooms[index]?.rooms)
      setActiveFloor(index)
    }
  }, [searchParams])

  const handleClick = (index, floorName) => {
    setFloorName(floorName)
    setRooms(boyRooms[index].rooms)
    setActiveFloor(index)

    // Update the URL with the selected floor index
    router.push(`?floor=${index}`)
  }

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
          <h1 className="font-bold text-[24px] text-[#4F378B]">boy rooms</h1>
          <Link href={'/buildings/create-floor'} className="flex items-center">
            <p className="mr-[8px]">Create Floor</p>
            <img
              src="/system-icons/plus-circle.png"
              className="w-[24px] h-[24px]"
            />
          </Link>
        </div>
        <div className="flex gap-[16px] flex-wrap">
          {boyRooms.map((floor, index) => (
            <div
              key={index}
              onClick={() => handleClick(index, floor.floor_name)}
              className={`w-[253px] h-[192px] cursor-pointer`}
            >
              <img
                src={floor.floor_img}
                className={`h-[152px] w-[253px] rounded-[16px] shadow-lg ${
                  activeFloor === index ? 'border-[4px] border-[#39f64f]' : ''
                }`} // Highlight active floor
              />
              <p className="mt-[16px] font-bold">{floor.floor_name}</p>
            </div>
          ))}
        </div>
      </div>

      <RoomCardContainer
        rooms={rooms}
        floorName={floorName}
        buildingId={buildingId}
      />
    </>
  )
}

export default page
