'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Header = ({ title }) => {
  const router = useRouter()
  return (
    <div className="my-[40px] flex justify-between items-center">
      <h1 className="font-bold text-[24px] ">{title}</h1>
      <button onClick={() => router.back()} className="font-bold">
        Back
      </button>
    </div>
  )
}

export default Header
