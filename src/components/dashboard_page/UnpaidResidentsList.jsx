import React from 'react'
import Link from 'next/link'

const UnpaidResidentsList = ({ unpaidResidents }) => {
  return (
    <div className="bg-white p-[16px] shadow-lg mb-[40px]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-[24px] text-[#671EE1]">
          Unpiad Residents List
        </h1>
        <p className="font-bold">Total: {unpaidResidents.length}</p>
      </div>
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
            {unpaidResidents?.map((resident, index) => (
              <tr key={index} className={`border-b`}>
                <td className="px-4 py-4">
                  <Link href={`#  `}>{resident.name}</Link>
                </td>
                <td className="px-4 py-4">{resident.roll_no}</td>
                <td className="px-4 py-4">{resident.major}</td>
                <td className="px-4 py-4">{resident.student_phone}</td>
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
                <td className="px-4 py-2 flex items-center">
                  <Link href={`#`} className="flex items-center ">
                    <img
                      src="/system-icons/user-edit.png"
                      alt="Edit"
                      className="w-[32px] mr-[24px]"
                    />
                  </Link>
                  <Link href={`#`} className="flex items-center">
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
      <p className="text-center mt-[16px] font-bold text-[#5F00FF]">
        View Full List
      </p>
    </div>
  )
}

export default UnpaidResidentsList
