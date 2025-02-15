'use client'
import Header from '@/components/building_page/Header'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('img', image);

    try {
      const res = await fetch(`http://localhost:3000/api/buildings`, {
        method: 'POST',
        body: formData
      })

      const data = await res.json();
      console.log(data);

    } catch (error) {
      console.log(error)
    }
  }


  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  return (
    <div>
      <Header title={'Create Building'} />
      <form onSubmit={submitHandler}>
        <p className="font-bold text-[#4F378B] mb-[16px]">Building Image</p>
        <label htmlFor="img">
          <img
            src="/building-images/building.jpg"
            width={252}
            height={152}
            className="rounded-[16px] shadow-lg mb-[40px] inline-block"
          />
        </label>
        <input id="img" type="file" hidden
          onChange={(e) => setImage(e.target.files[0])}
        />

        <p className="font-bold text-[#4F378B] mb-[16px]">Building Name</p>
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
