import React from 'react'
import Link from 'next/link'
const page = async () => {
  let guests
  try {
    const res = await fetch(`http://localhost:3000/api/residents`)
    guests = await res.json()
    console.log(guests)
  } catch (error) {
    console.log('Failed to fetch resident data: ', error)
  }
  return (
    <div>
      <div className="mt-[40px] mb-[40px]">
        <h1 className="text-[32px] font-bold">Thu Thet Thar</h1>
      </div>
      <div className="flex items-center justify-center mb-[40px]">
        <form className="flex items-center shadow-lg" action={'/residents'}>
          <input
            type="text"
            placeholder="Search by name"
            className="w-[258px]  py-[8px] pl-[16px] border border-black rounded-l-[8px]"
          />
          <div className="">
            <button
              type="submit"
              className="font-bold text-white bg-[#671EE1] py-[8px] px-[16px] border border-t-black border-b-black border-r-black rounded-r-[8px]"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* Table wrapper */}
      <div className="mt-[24px] max-h-[600px] overflow-y-auto bg-[#ffffff] shadow-lg rounded-[16px]">
        <table className="table-auto w-full relative">
          <thead className="sticky top-0 bg-[#671EE1] ">
            <tr className="text-left font-semibold text-white">
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Roll No</th>
              <th className="px-4 py-4">Major</th>
              <th className="px-4 py-4">Phone</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {guests?.map((guest, index) => (
              <tr key={index} className={`border-b`}>
                <td className="px-4 py-4">
                  <Link href={`/residents/${guest.id}`}>{guest.name}</Link>
                </td>
                <td className="px-4 py-4">{guest.roll_no}</td>
                <td className="px-4 py-4">{guest.major}</td>
                <td className="px-4 py-4">{guest.student_phone}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded ${
                      guest.status === 'Paid'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {guest.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex items-center">
                  <Link
                    href={`/residents/edit-resident?resident_id=${guest.id}&room_id=${guest.room_id}`}
                    className="flex items-center "
                  >
                    <img
                      src="/system-icons/user-edit.png"
                      alt="Edit"
                      className="w-[32px] mr-[24px]"
                    />
                  </Link>
                  <Link
                    href={`/residents/add-payment?resident_id=${guest.id}`}
                    className="flex items-center"
                  >
                    <img
                      src="/system-icons/card.png"
                      alt="Edit"
                      className="h-[34px]"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
