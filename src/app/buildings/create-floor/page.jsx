'use client'
import Header from '@/components/building_page/Header'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const buildingId = searchParams.get('building_id')
  console.log(buildingId)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('img', image)
    formData.append('building_id', buildingId)

    try {
      const res = await fetch(`http://localhost:3000/api/floors`, {
        method: 'POST',
        body: formData,
      })
      router.push(`/buildings/${buildingId}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Header title={'Create Floor'} />
      <form onSubmit={submitHandler}>
        <p className="font-bold text-[#4F378B] mb-[16px]">Floor Image</p>
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

        <p className="font-bold text-[#4F378B] mb-[16px]">Floor Name</p>
        <input
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter building name"
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <button
          type="submit"
          className="w-[160px] h-[32px] bg-[#AEFFB8] rounded-[16px] shadow-lg font-bold"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default page
