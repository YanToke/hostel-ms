'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const SmallHeader = () => {
  const router = useRouter()
  return (
    <div className="flex justify-between items-center mt-[40px] mb-[40px]">
      <h1 className="text-[32px] font-bold ">Thu Thet Thar</h1>
      <button onClick={() => router.back()} className="font-bold">
        Back
      </button>
    </div>
  )
}

export default SmallHeader
