'use client'
import Header from '@/components/building_page/Header'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const [image, setImage] = useState('')
  const [data, setData] = useState({
    name: '',
  })
  const router = useRouter()

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
    formData.append('name', data.name)
    formData.append('img', image)

    try {
      const res = await fetch(`http://localhost:3000/api/buildings`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      console.log(data)
      router.push('/buildings')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Header title={'Create Building'} />
      <form onSubmit={submitHandler}>
        <p className="font-bold text-[#671EE1] mb-[16px]">Building Image</p>
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

        <p className="font-bold text-[#671EE1] mb-[16px]">Building Name</p>
        <input
          name="name"
          required
          type="text"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] pl-[24px] mb-[40px]"
          placeholder="Enter building name"
          onChange={onChangeHandler}
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
