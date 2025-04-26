/*
    targetId = "the id of the building, floor or room"
    deletingFor = "variable for api route"
                   its value can be "buildings", "floors", "rooms"
*/

'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const DeleteBtn = ({ targetId, deletingFor }) => {
  const router = useRouter()
  const handleClick = async () => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this?'
      )

      if (!confirmDelete) return

      const res = await fetch(
        `http://localhost:3000/api/${deletingFor}/${targetId}`,
        {
          method: 'DELETE',
        }
      )
      if (!res.ok) {
        console.log('Failed to delete')
      } else {
        console.log('Successfully deleted ')
        router.refresh() // Refresh the data
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button
      className="flex items-center font-bold text-red-500"
      onClick={() => handleClick()}
    >
      <img
        src="/system-icons/trash.png"
        alt="trash-can"
        className="w-[16px]  mr-[8px]"
      />
      Delete
    </button>
  )
}

export default DeleteBtn
