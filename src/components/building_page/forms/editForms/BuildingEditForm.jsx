'use client'
import Header from '@/components/building_page/Header'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const BuildingEditForm = ({ id, name, img }) => {
  const [previewImage, setPreviewImage] = useState(img)
  const [image, setImage] = useState(previewImage)
  const [data, setData] = useState({ name })
  const router = useRouter()
  console.log('name', data.name)
  console.log('img', image)

  function onChangeHandler(event) {
    const { name, value } = event.target
    console.log('I am event target', event.target)
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const imageChangeHandler = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    console.log('Before push', data.name, 'Image', image)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('img', image)
    try {
      const res = await fetch(`http://localhost:3000/api/buildings/${id}`, {
        method: 'PUT',
        body: formData,
      })

      const resData = await res.json()
      console.log(resData)
      router.push('/buildings')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Header title={'Edit Building'} />
      <form onSubmit={submitHandler}>
        <p className="font-bold text-[#671EE1] mb-[16px]">Building Image</p>
        <label htmlFor="img">
          <img
            src={previewImage || '/building-images/building.jpg'}
            width={252}
            height={152}
            className="rounded-[16px] shadow-lg mb-[40px] inline-block w-[252px] h-[152px]"
            alt="Building Preview"
          />
        </label>
        <input id="img" type="file" hidden onChange={imageChangeHandler} />

        <p className="font-bold text-[#671EE1] mb-[16px]">Building Name</p>
        <input
          name="name"
          required
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter building name"
          value={data.name}
          onChange={onChangeHandler}
        />

        <br />
        <button
          type="submit"
          className="w-[160px] h-[32px] bg-[#671EE1] text-white rounded-[16px] shadow-lg font-bold"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default BuildingEditForm
