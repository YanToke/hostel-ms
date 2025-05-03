//To display all Buildings
import DeleteBtn from '@/components/building_page/DeleteBtn'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const data = await fetch('http://localhost:3000/api/buildings')
  const buildings = await data.json()

  return (
    <div>
      <h1 className="text-[32px] font-bold mt-[40px] mb-[40px]">
        Thu Thet Thar
      </h1>
      <div className="flex items-center justify-between mb-[24px]">
        <h1 className="text-[24px] text-[#671EE1] font-bold">Buildings</h1>

        <Link href={`/buildings/create-building`} className="flex items-center">
          <p className="mr-[8px] text-[#671EE1] font-bold">Create Building</p>
          <img
            src="/system-icons/plus-circle.png"
            className="w-[24px] h-[24px]"
          />
        </Link>
      </div>
      <div className="flex flex-wrap gap-[24px] w-[100%]">
        {buildings.map((building, index) => (
          <div key={index} className="card">
            <Link href={`/buildings/${building.id}`}>
              <Image
                src={building.img}
                width={253}
                height={152}
                className="h-[152px] w-[253px] rounded-[16px] shadow-lg"
                alt="image"
              />
              <p className="mt-[16px] font-bold">{building.name}</p>
            </Link>
            <Link
              href={`/buildings/edit-building?building_id=${building.id}`}
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
            <DeleteBtn targetId={building.id} deletingFor={'buildings'} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
