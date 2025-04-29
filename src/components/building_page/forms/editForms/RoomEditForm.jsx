'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Header from '../../Header'

const RoomEditForm = ({ name, img, floorId, buildingId, roomId, capacity }) => {
  const [previewImage, setPreviewImage] = useState(img)
  const [image, setImage] = useState(previewImage)
  const [data, setData] = useState({ name, capacity })

  const router = useRouter()

  function onChangeHandler(event) {
    const { name, value } = event.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const imageChangeHandler = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('capacity', data.capacity)
    formData.append('img', image)

    try {
      const res = await fetch(`http://localhost:3000/api/rooms/${roomId}`, {
        method: 'PUT',
        body: formData,
      })

      const resData = await res.json()
      console.log(resData)
      router.push(`http://localhost:3000/buildings/${buildingId}/${floorId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Header title={'Edit Room'} />
      <form onSubmit={submitHandler}>
        <p className="font-bold text-[#4F378B] mb-[16px]">Room Image</p>
        <label htmlFor="img">
          <img
            src={previewImage || '/placeholder-images/placeholder.png'}
            width={252}
            height={152}
            className="rounded-[16px] shadow-lg mb-[40px] inline-block w-[252px] h-[152px]"
            alt="Floor Preview"
          />
        </label>
        <input id="img" type="file" hidden onChange={imageChangeHandler} />

        <p className="font-bold text-[#4F378B] mb-[16px]">Room Name</p>
        <input
          name="name"
          required
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter floor name"
          value={data.name}
          onChange={onChangeHandler}
        />

        <p className="font-bold text-[#4F378B] mb-[16px]">Capacity</p>
        <input
          name="capacity"
          type="number"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter room capacity"
          onChange={onChangeHandler}
          value={data.capacity}
        />

        <br />
        <button
          type="submit"
          className="w-[160px] h-[32px] bg-[#AEFFB8] rounded-[16px] shadow-lg font-bold"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default RoomEditForm
