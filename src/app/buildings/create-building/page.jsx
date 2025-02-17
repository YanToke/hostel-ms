'use client'
import Header from '@/components/building_page/Header'
import React, { useState } from 'react'

const page = () => {
  const [image, setImage] = useState('')

  return (
    <div>
      <Header title={'Create Building'} />
      <form>
        <p className="font-bold text-[#4F378B] mb-[16px]">Building Image</p>
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

        <p className="font-bold text-[#4F378B] mb-[16px]">Building Name</p>
        <input
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter building name"
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
