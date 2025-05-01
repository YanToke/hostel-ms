import Header from '@/components/building_page/Header'
import React from 'react'

const page = async () => {
  // try {
  //   const res = await fetch(`http://localhost:3000/buildings/`)
  // } catch (error) {
  //   console.log('Failed to fetch resident data')
  // }

  return (
    <>
      <Header title={'Resident Information'} />
      <div className="grid grid-cols-2 text-left">
        <div>
          <div className="mb-[24px]">
            <div className="text-[#4F378B] font-bold mb-[8px]">Name</div>
            <div>Sai Eain Khant</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#4F378B] font-bold mb-[8px]">Father Name</div>
            <div>U Aung Myo Win</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#4F378B] font-bold mb-[8px]">NRC NO.</div>
            <div>1234</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#4F378B] font-bold mb-[8px]">Gender</div>
            <div>Male</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#4F378B] font-bold mb-[8px]">Address</div>
            <div>No.5 Street, Zabuthiri Township, Naypyitaw</div>
          </div>
        </div>
        <div>
          <div className="mb-[24px]">
            <div className="text-[#4F378B] font-bold mb-[8px]">Status</div>
            <div className="font-bold bg-green-200 w-[112px] py-[4px] text-center rounded-[8px]">
              Paid
            </div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#4F378B] font-bold mb-[8px]">Roll Number</div>
            <div>CS-1234</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#4F378B] font-bold mb-[8px]">Major</div>
            <div>Computer Science</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#4F378B] font-bold mb-[8px]">Phone 1</div>
            <div>1233435435</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#4F378B] font-bold mb-[8px]">Phone 2</div>
            <div>21242321222</div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-[24px] text-[#4F378B] mb-[36px]">
          Monthly Transaction Record
        </h1>
        <div className="mt-[24px] max-h-[600px] overflow-y-auto bg-[#F7FFFD] shadow-lg rounded-[16px]">
          <table className="table-auto w-full relative">
            <thead className="sticky top-0 bg-[#F7FFFD] ">
              <tr className="text-left font-semibold">
                <th className="px-4 py-4">Paid Date</th>
                <th className="px-4 py-4">Months</th>
                <th className="px-4 py-4">Due Date</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-4 py-4">Payment Status</th>
                <th className="px-4 py-4">Days Late</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b`}>
                <td className="px-4 py-4">a</td>
                <td className="px-4 py-4">b</td>
                <td className="px-4 py-4">c</td>
                <td className="px-4 py-4">d</td>
                <td className="px-4 py-4">d</td>
                <td className="px-4 py-4">d</td>
                <td className="px-4 py-2">
                  <button className="flex items-center text-gray-700 hover:text-gray-900">
                    <img
                      src="/system-icons/paper-pen.png"
                      alt="Edit"
                      className="w-[32px]"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default page
