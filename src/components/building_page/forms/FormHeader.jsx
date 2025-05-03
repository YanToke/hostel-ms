'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const FormHeader = ({ title, id_package }) => {
  const deleteResident = async () => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this?'
      )

      if (!confirmDelete) return

      const res = await fetch(
        `http://localhost:3000/api/residents/${id_package.residentId}`,
        {
          method: 'DELETE',
        }
      )
      if (!res.ok) {
        console.log('Failed to delete')
      } else {
        console.log('Successfully deleted ')
        if (id_package.buildingId && id_package.floorId && id_package.roomId) {
          router.push(
            `/buildings/${id_package.buildingId}/${id_package.floorId}/${id_package.roomId}`
          )
        } else {
          router.push('/residents')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const router = useRouter()
  return (
    <div className="my-[40px] flex justify-between items-center">
      <h1 className="font-bold text-[24px] ">{title}</h1>
      <div>
        <button
          onClick={() => deleteResident()}
          className="font-bold text-red-500 mr-[80px]"
        >
          Delete Resident
        </button>
        <button onClick={() => router.back()} className="font-bold">
          Back
        </button>
      </div>
    </div>
  )
}

export default FormHeader
