import React from 'react'

const page = () => {
  const guests = [
    {
      name: 'John Doe',
      roll: '2-Alpha-1',
      major: 'Engineering',
      phone: '09123456781',
      status: 'Paid',
    },
    {
      name: 'Jane Smith',
      roll: '2-Alpha-2',
      major: 'Mathematics',
      phone: '09123456782',
      status: 'Unpaid',
    },
    {
      name: 'Michael Johnson',
      roll: '2-Alpha-3',
      major: 'Physics',
      phone: '09123456783',
      status: 'Paid',
    },
    {
      name: 'Emily Davis',
      roll: '2-Alpha-4',
      major: 'Biology',
      phone: '09123456784',
      status: 'Unpaid',
    },
    {
      name: 'Chris Brown',
      roll: '2-Alpha-5',
      major: 'Chemistry',
      phone: '09123456785',
      status: 'Paid',
    },
    {
      name: 'Emma Wilson',
      roll: '2-Alpha-6',
      major: 'Computer Science',
      phone: '09123456786',
      status: 'Unpaid',
    },
    {
      name: 'Liam Martinez',
      roll: '2-Alpha-7',
      major: 'Electrical Engineering',
      phone: '09123456787',
      status: 'Paid',
    },
    {
      name: 'Sophia Garcia',
      roll: '2-Alpha-8',
      major: 'Mechanical Engineering',
      phone: '09123456788',
      status: 'Unpaid',
    },
    {
      name: 'Oliver Lee',
      roll: '2-Alpha-9',
      major: 'Civil Engineering',
      phone: '09123456789',
      status: 'Paid',
    },
    {
      name: 'Ava Walker',
      roll: '2-Alpha-10',
      major: 'Environmental Science',
      phone: '09123456790',
      status: 'Unpaid',
    },
  ]
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
              className="font-bold bg-[#AEFFB8] py-[8px] px-[16px] border border-t-black border-b-black border-r-black rounded-r-[8px]"
            >
              Search
            </button>
          </div>
        </form>
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
          <tbody>
            {guests.map((guest, index) => (
              <tr key={index} className={`border-b`}>
                <td className="px-4 py-4">{guest.name}</td>
                <td className="px-4 py-4">{guest.roll}</td>
                <td className="px-4 py-4">{guest.major}</td>
                <td className="px-4 py-4">{guest.phone}</td>
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
        </table>
      </div>
    </div>
  )
}

export default page
