import Header from '@/components/building_page/Header'
import React from 'react'

const page = async ({ params }) => {
  const { residentId } = await params
  console.log(residentId)
  let data = null
  let paymentData = null;
  try {
    const residentResponse = await fetch(`http://localhost:3000/api/residents/${residentId}`);
    const paymentResponse = await  fetch(`http://localhost:3000/api/payments/resident/${residentId}`) 
     data = await residentResponse.json();
     paymentData = await paymentResponse.json();
    console.log(data)
    console.log(paymentData);
  } catch (error) {
    console.log('Failed to fetch resident data')
  }

  return (
    <>
      <Header title={'Resident Information'} />
      <div className="grid grid-cols-2 text-left bg-white p-[16px] rounded-[8px] shadow-lg">
        <div>
          <div className="mb-[24px]">
            <div className="text-[#671EE1] font-bold mb-[8px]">Name</div>
            <div>{data?.name}</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#671EE1] font-bold mb-[8px]">Father Name</div>
            <div>{data?.father_name}</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#671EE1] font-bold mb-[8px]">NRC NO.</div>
            <div>{data?.nrc_no}</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#671EE1] font-bold mb-[8px]">Gender</div>
            <div>{data?.gender}</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#671EE1] font-bold mb-[8px]">Address</div>
            <div>{data?.address}</div>
          </div>
        </div>
        <div>
          <div className="mb-[24px]">
            <div className="text-[#671EE1] font-bold mb-[8px]">Status</div>
            <div className="font-bold bg-green-200 w-[112px] py-[4px] text-center rounded-[8px]">
              {data?.status}
            </div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#671EE1] font-bold mb-[8px]">Roll Number</div>
            <div>{data?.roll_no}</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#671EE1] font-bold mb-[8px]">Major</div>
            <div>{data?.major}</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#671EE1] font-bold mb-[8px]">Phone 1</div>
            <div>{data?.student_phone}</div>
          </div>
          <div className="mb-[24px]">
            <div className="text-[#671EE1] font-bold mb-[8px]">Phone 2</div>
            <div>{data?.parent_phone}</div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-[24px] text-[#671EE1] mt-[36px] mb-[24px]">
          Monthly Transaction Record
        </h1>
        <div className="mt-[24px] max-h-[600px] overflow-y-auto bg-white shadow-lg rounded-[16px]">
          <table className="table-auto w-full relative">
            <thead className="sticky top-0 bg-[#671EE1] ">
              <tr className="text-left font-semibold text-white">
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
              {paymentData && paymentData.map( (payment,index) => (
                <tr className={`border-b`} key={index}>
                <td className="px-4 py-4">{payment.paid_date}</td>
                <td className="px-4 py-4">{payment.month}</td>
                <td className="px-4 py-4">{payment.due_date}</td>
                <td className="px-4 py-4">{payment.amount}</td>
                <td className="px-4 py-4">{payment.status}</td>
                <td className="px-4 py-4">{payment.day_late}</td>
                <td className="px-4 py-2">
                  <button className="flex items-center">
                    <img
                      src="/system-icons/paper-pen.png"
                      alt="Edit"
                      className="w-[32px]"
                    />
                  </button>
                </td>
              </tr>
              ))}
              {/* <tr className={`border-b`}>
                <td className="px-4 py-4">a</td>
                <td className="px-4 py-4">b</td>
                <td className="px-4 py-4">c</td>
                <td className="px-4 py-4">d</td>
                <td className="px-4 py-4">d</td>
                <td className="px-4 py-4">d</td>
                <td className="px-4 py-2">
                  <button className="flex items-center">
                    <img
                      src="/system-icons/paper-pen.png"
                      alt="Edit"
                      className="w-[32px]"
                    />
                  </button>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default page
