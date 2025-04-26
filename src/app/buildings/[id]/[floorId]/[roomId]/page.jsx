// page to display all residents that live in the room
import React from 'react'
import SmallHeader from '@/components/building_page/SmallHeader'
import { getRoomName } from '@/libs/getNames'
import Link from 'next/link'

const page = async ({ params }) => {
  const { id: buildingId, floorId: floorId, roomId: roomId } = await params
  console.log('room id is ', roomId)
  const data = await fetch(
    `http://localhost:3000/api/buildings/${buildingId}/${floorId}/${roomId}`
  )
  const residents = await data.json()
  console.log(residents)

  const roomName = await getRoomName(buildingId, floorId, roomId)

  return (
    <div>
      <SmallHeader />
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[24px]">
            <span className="font-bold text-[#4F378B]">{roomName}</span>
          </p>
          <Link
            href={`/buildings/create-resident?building_id=${buildingId}&floor_id=${floorId}&room_id=${roomId}`}
            className="flex items-center gap-[14px] bg-[#AEFFB8] py-[8px] pl-[16px] pr-[8px] shadow-lg"
          >
            <span className="font-bold text-[#4F378B]">Add Guest</span>
            <img src="/system-icons/user-plus.png" className="w-[40px]" />
          </Link>
        </div>

        {/* Table wrapper */}
        <div className="mt-[24px] max-h-[600px] overflow-y-auto bg-[#F7FFFD] shadow-lg rounded-[16px]">
          <table className="table-auto w-full relative">
            <thead className="sticky top-0 bg-[#F7FFFD] ">
              <tr className="text-left font-semibold">
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Roll No</th>
                <th className="px-4 py-4">Major</th>
                <th className="px-4 py-4">Phone</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>
            {residents.length <= 0 ? (
              <tbody className="text-left">
                <tr>
                  <td className="py-[16px] pl-[16px] font-bold text-red-500">
                    No resident occupied yet
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {residents.map((resident, index) => (
                  <tr key={index} className={`border-b`}>
                    <td className="px-4 py-4">{resident.name}</td>
                    <td className="px-4 py-4">{resident.roll_no}</td>
                    <td className="px-4 py-4">{resident.major}</td>
                    <td className="px-4 py-4">{resident.phone}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded ${
                          resident.status === 'Paid'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {resident.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button className="flex items-center text-gray-700 hover:text-gray-900">
                        <img
                          src="/system-icons/user-edit.png"
                          alt="Edit"
                          className="w-[32px]"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

export default page
