// To display create-room page
'use client'
import Header from '@/components/building_page/Header'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const page = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [capacity, setCapacity] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const floorId = searchParams.get('floor_id')
  const buildingId = searchParams.get('building_id')

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('floor_id', floorId)
    formData.append('img', image)
    formData.append('capacity', capacity || 0)
    try {
      const res = await fetch(`http://localhost:3000/api/rooms`, {
        method: 'POST',
        body: formData,
      })
      router.push(`/buildings/${buildingId}/${floorId}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Header title={'Create Room'} />
      <form onSubmit={submitHandler}>
        <p className="font-bold text-[#671EE1] mb-[16px]">Room Image</p>
        <label htmlFor="img">
          <img
            src={
              !image
                ? '/placeholder-images/placeholder.png'
                : URL.createObjectURL(image)
            }
            width={252}
            height={152}
            className="rounded-[16px] shadow-lg mb-[40px] inline-block w-[252px] h-[152px]"
          />
        </label>
        <input
          id="img"
          type="file"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />

        <p className="font-bold text-[#671EE1] mb-[16px]">Room Name</p>
        <input
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter room name"
          onChange={(e) => setName(e.target.value)}
        />

        <p className="font-bold text-[#671EE1] mb-[16px]">Capacity</p>
        <input
          type="number"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter room capacity"
          onChange={(e) => setCapacity(e.target.value)}
        />

        <br />

        <button
          type="submit"
          className="w-[160px] h-[32px] bg-[#671EE1] text-white rounded-[16px] shadow-lg font-bold"
        >
          Create
        </button>
      </form>
    </div>
  )
}
export default page
