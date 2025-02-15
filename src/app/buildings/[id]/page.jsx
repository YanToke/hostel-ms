'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import RoomCardContainer from '@/components/building_page/RoomCardContainer'

const Page = () => {
  const [buildingId, setBuildingId] = useState('')
  const [building, setBuilding] = useState([])
  const [rooms, setRooms] = useState([])
  const [floorName, setFloorName] = useState('')
  const [activeFloor, setActiveFloor] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()

  // Fetch building data when buildingId changes
  useEffect(() => {
    if (params?.id) {
      setBuildingId(params.id)
    }
  }, [params])

  useEffect(() => {
    if (!buildingId) return

    const fetchBuilding = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/buildings/${buildingId}`
        )
        const data = await response.json()
        console.log('Building:', data)
        setBuilding(data);

        // Set initial floor data from URL param
        const floorIndex = searchParams.get('floor')
        if (floorIndex !== null) {
          const index = parseInt(floorIndex)
          if (data[index]) {
            setFloorName(data[index].floor_name)
            setRooms(data[index].rooms)
            setActiveFloor(index)
          }
        }
      } catch (error) {
        console.error('Error fetching building data:', error)
      }
    }

    fetchBuilding()
  }, [buildingId, searchParams])

  const handleClick = (index, floorName) => {
    setFloorName(floorName)
    setRooms(building[index]?.rooms || [])
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
          <h1 className="font-bold text-[24px] text-[#4F378B]">Boy Rooms</h1>
          <Link href={`/buildings/create-floor?building_id=${buildingId}`} className="flex items-center">
            <p className="mr-[8px]">Create Floor</p>
            <img
              src="/system-icons/plus-circle.png"
              className="w-[24px] h-[24px]"
            />
          </Link>
        </div>

        <div className="flex gap-[16px] flex-wrap">
          {building.map((floor, index) => (
            <div
              key={index}
              onClick={() => handleClick(index, floor.floor_name)}
              className="w-[253px] h-[192px] cursor-pointer"
            >
              <img
                src={floor.floor_img}
                className={`h-[152px] w-[253px] rounded-[16px] shadow-lg ${
                  activeFloor === index ? 'border-[4px] border-[#39f64f]' : ''
                }`}
              />
              <p className="mt-[16px] font-bold">{floor.floor_name}</p>
            </div>
          ))}
        </div>
      </div>

      {activeFloor?.toString() && <RoomCardContainer
        rooms={rooms}
        floorName={floorName}
        buildingId={buildingId} 
        floorId={building[activeFloor].floor_id}
        />
      }

      {/* <RoomCardContainer
        rooms={rooms}
        floorName={floorName}
        buildingId={buildingId}
      /> */}
    </>
  )
}

export default Page
