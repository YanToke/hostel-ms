'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const [data, setData] = useState({
    name: '',
    father_name: '',
    nrc_no: '',
    address: '',
    gender: 'male',
    roll_number: '',
    major: '',
    resident_phone: '',
    parent_phone: '',
  })
  const searchParams = useSearchParams()
  const buildingId = searchParams.get('building_id')
  const floorId = searchParams.get('floor_id')
  const roomId = searchParams.get('room_id')

  console.log(data)
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
    formData.append('room_id', roomId)
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
      const res = await fetch(`http://localhost:3000/api/residents`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        console.log(await res.json())
      } else {
        router.push(`/buildings/${buildingId}/${floorId}/${roomId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //function for resetting the form
  const resetForm = () => {
    setData({
      name: '',
      father_name: '',
      nrc_no: '',
      address: '',
      gender: 'male',
      roll_number: '',
      major: '',
      resident_phone: '',
      parent_phone: '',
    })
  }

  return (
    <div>
      <div className="my-[40px] flex justify-between items-center">
        <h1 className="font-bold text-[24px] ">Add Resident</h1>
        <div>
          <button
            onClick={() => resetForm()}
            className="font-bold text-red-500 mr-[80px]"
          >
            Reset From
          </button>
          <button onClick={() => router.back()} className="font-bold">
            Back
          </button>
        </div>
      </div>

      {/*Form*/}
      <form onSubmit={submitHandler}>
        <p className="font-bold text-[#4F378B] mb-[16px]">Name</p>
        <input
          name="name"
          required
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter resident name"
          onChange={onChangeHandler}
          value={data.name}
        />

        <p className="font-bold text-[#4F378B] mb-[16px]">Father Name</p>
        <input
          name="father_name"
          required
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter father name"
          onChange={onChangeHandler}
          value={data.father_name}
        />

        <p className="font-bold text-[#4F378B] mb-[16px]">NRC Number</p>
        <input
          name="nrc_no"
          required
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter NRC number"
          onChange={onChangeHandler}
          value={data.nrc_no}
        />

        <p className="font-bold text-[#4F378B] mb-[16px]">Address</p>
        <input
          name="address"
          required
          type="text"
          className="border-[2px] border-black w-[344px] min-h-[64px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter resident address"
          onChange={onChangeHandler}
          value={data.address}
        />

        <p className="font-bold text-[#4F378B] mb-[16px]">Gender</p>
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

        <p className="font-bold text-[#4F378B] mb-[16px]">Roll Number</p>
        <input
          name="roll_number"
          required
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter your roll number"
          onChange={onChangeHandler}
          value={data.roll_number}
        />

        <p className="font-bold text-[#4F378B] mb-[16px]">Major</p>
        <input
          name="major"
          required
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter your major"
          onChange={onChangeHandler}
          value={data.major}
        />

        <p className="font-bold text-[#4F378B] mb-[16px]">Resident Phone</p>
        <input
          name="resident_phone"
          required
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter resident phone number"
          onChange={onChangeHandler}
          value={data.resident_phone}
        />

        <p className="font-bold text-[#4F378B] mb-[16px]">Parent Phone</p>
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
          className="w-[160px] h-[32px] mb-[40px] bg-[#AEFFB8] rounded-[16px] shadow-lg font-bold"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default page
