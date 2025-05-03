'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
const ResidentEditForm = ({ resident, id_package }) => {
  const [data, setData] = useState({
    name: resident.name,
    father_name: resident.father_name,
    nrc_no: resident.nrc_no,
    address: resident.address,
    gender: resident.gender,
    roll_number: resident.roll_no,
    major: resident.major,
    resident_phone: resident.student_phone,
    parent_phone: resident.parent_phone,
  })

  const router = useRouter()

  //handling the form input changes
  //
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((prevData) => {
      const newData = { ...prevData, [name]: value }
      return newData
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('room_id', id_package.roomId)
    formData.append('name', data.name)
    formData.append('father_name', data.father_name)
    formData.append('nrc_no', data.nrc_no)
    formData.append('roll_no', data.roll_number)
    formData.append('major', data.major)
    formData.append('address', data.address)
    formData.append('student_phone', data.resident_phone)
    formData.append('parent_phone', data.parent_phone)
    formData.append('gender', data.gender)

    try {
      const res = await fetch(
        `http://localhost:3000/api/residents/${id_package.residentId}`,
        {
          method: 'PUT',
          body: formData,
        }
      )
      if (!res.ok) {
        console.log(await res.json())
      } else {
        if (id_package.buildingId && id_package.floorId && id_package.roomId) {
          router.push(
            `/buildings/${id_package.buildingId}/${id_package.floorId}/${id_package.roomId}`
          )
        } else {
          router.push('/residents')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <p className="font-bold text-[#671EE1] mb-[16px]">Name</p>
      <input
        name="name"
        required
        type="text"
        className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
        placeholder="Enter resident name"
        onChange={onChangeHandler}
        value={data.name}
      />

      <p className="font-bold text-[#671EE1] mb-[16px]">Father Name</p>
      <input
        name="father_name"
        required
        type="text"
        className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
        placeholder="Enter father name"
        onChange={onChangeHandler}
        value={data.father_name}
      />

      <p className="font-bold text-[#671EE1] mb-[16px]">NRC Number</p>
      <input
        name="nrc_no"
        required
        type="text"
        className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
        placeholder="Enter NRC number"
        onChange={onChangeHandler}
        value={data.nrc_no}
      />

      <p className="font-bold text-[#671EE1] mb-[16px]">Address</p>
      <input
        name="address"
        required
        type="text"
        className="border-[2px] border-black w-[344px] min-h-[64px] rounded-[8px] pl-[24px] mb-[40px]"
        placeholder="Enter resident address"
        onChange={onChangeHandler}
        value={data.address}
      />

      <p className="font-bold text-[#671EE1] mb-[16px]">Gender</p>
      <select
        name="gender"
        required
        className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] px-[24px] mb-[40px]"
        onChange={onChangeHandler}
        value={data.gender}
      >
        <option value={'male'}>Male</option>
        <option value={'female'}>Female</option>
      </select>

      <p className="font-bold text-[#671EE1] mb-[16px]">Roll Number</p>
      <input
        name="roll_number"
        required
        type="text"
        className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
        placeholder="Enter your roll number"
        onChange={onChangeHandler}
        value={data.roll_number}
      />

      <p className="font-bold text-[#671EE1] mb-[16px]">Major</p>
      <input
        name="major"
        required
        type="text"
        className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
        placeholder="Enter your major"
        onChange={onChangeHandler}
        value={data.major}
      />

      <p className="font-bold text-[#671EE1] mb-[16px]">Resident Phone</p>
      <input
        name="resident_phone"
        required
        type="text"
        className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
        placeholder="Enter resident phone number"
        onChange={onChangeHandler}
        value={data.resident_phone}
      />

      <p className="font-bold text-[#671EE1] mb-[16px]">Parent Phone</p>
      <input
        name="parent_phone"
        required
        type="text"
        className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
        placeholder="Enter parent phone number"
        onChange={onChangeHandler}
        value={data.parent_phone}
      />

      <br />

      <button
        type="submit"
        className="w-[160px] h-[32px] mb-[40px] bg-[#671EE1] text-white rounded-[16px] shadow-lg font-bold"
      >
        Update
      </button>
    </form>
  )
}

export default ResidentEditForm
