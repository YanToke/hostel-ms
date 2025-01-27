import { getAllBuildings } from '@/models/Building'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const buildings = await getAllBuildings()

  return (
    <div>
      <h1 className="text-[32px] font-bold mt-[40px] mb-[40px]">
        Thu Thet Thar
      </h1>
      <div className="flex items-center justify-between mb-[24px]">
        <h1 className="text-[24px] text-[#4F378B] font-bold">Buildings</h1>

        <Link href={'/buildings/create-building'} className="flex items-center">
          <p className="mr-[8px]">Create Building</p>
          <img
            src="./system-icons/plus-circle.png"
            className="w-[24px] h-[24px]"
          />
        </Link>
      </div>
      <div className="flex flex-nowarp gap-[24px]">
        {buildings.map((building, index) => (
          <Link
            key={index}
            href={`/buildings/${building.id}`}
            className="w-[253px] h-[192px]"
          >
            <img
              src={building.img}
              className="h-[152px] w-[253px] rounded-[16px] shadow-lg"
            />
            <p className="mt-[16px] font-bold">{building.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default page
