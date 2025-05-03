'use client'
import Header from '@/components/building_page/Header'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const searchParams = useSearchParams()
  const residentId = searchParams.get('resident_id')
  const buildingId = searchParams.get('building_id')
  const roomId = searchParams.get('room_id')
  const floorId = searchParams.get('floor_id')

  const [data, setData] = useState({
    paid_date: '',
    month: 1,
    amount: 0,
    due_date: null,
  })
  const router = useRouter()

  const calculateDueDate = (startDateStr, monthsToAdd) => {
    const startDate = new Date(startDateStr)
    startDate.setMonth(startDate.getMonth() + Number(monthsToAdd))
    return startDate.toISOString().split('T')[0] // returns 'YYYY-MM-DD'
  }

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setData((prevData) => {
      const updatedData = { ...prevData, [name]: value }

      // If both paid_date and month are available, calculate due_date
      if (updatedData.paid_date && updatedData.month) {
        updatedData.due_date = calculateDueDate(
          updatedData.paid_date,
          updatedData.month
        )
      }

      return updatedData
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('resident_id', residentId)
    formData.append('paid_date', data.paid_date)
    formData.append('due_date', data.due_date)
    formData.append('month', data.month)
    formData.append('amount', data.amount)
    try {
      const res = await fetch(`http://localhost:3000/api/payments`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      router.push(`/buildings/${buildingId}/${floorId}/${roomId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Header title={'Add Payment Information'} />
      <form onSubmit={submitHandler}>
        <p className="font-bold text-[#671EE1] mb-[16px]">Paid Date</p>
        <input
          name="paid_date"
          required
          type="date"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] px-[24px] mb-[40px]"
          onChange={onChangeHandler}
          value={data.paid_date}
        />

        <p className="font-bold text-[#671EE1] mb-[16px]">
          Months (for how many month)
        </p>
        <input
          name="month"
          required
          type="number"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] px-[24px] mb-[16px]"
          placeholder="Enter the number of month"
          onChange={onChangeHandler}
          value={data.month}
        />

        <p className="mb-[40px] font-bold text-red-500">
          Your due date gonna be{' '}
          <span className="text-black">{data.due_date}</span>
        </p>

        <p className="font-bold text-[#671EE1] mb-[16px]">Amount</p>
        <input
          name="amount"
          required
          type="number"
          className="border-[2px] border-black w-[344px] h-[40px] rounded-[8px] px-[24px] mb-[40px]"
          placeholder="Enter payment amount"
          onChange={onChangeHandler}
          value={data.amount}
        />

        <br />

        <button
          type="submit"
          className="w-[160px] h-[32px] bg-[#671EE1] text-white rounded-[16px] shadow-lg font-bold"
        >
          Add Payment
        </button>
      </form>
    </div>
  )
}

export default page
