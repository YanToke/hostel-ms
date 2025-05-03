import ResidentEditForm from '@/components/building_page/forms/editForms/ResidentEditForm'
import FormHeader from '@/components/building_page/forms/FormHeader'
import React from 'react'

const page = async ({ searchParams }) => {
  const id = await searchParams
  const id_package = {
    buildingId: id.building_id,
    floorId: id.floor_id,
    roomId: id.room_id,
    residentId: id.resident_id,
  }

  //getting all the resident data from the database
  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/residents`)
      const data = await res.json()
      return data
    } catch (error) {
      console.log('failed to fetch resident data', error)
      return []
    }
  }

  const residentData = await getData()
  const resident = residentData.find(
    (item) => String(item.id) === String(id_package.residentId)
  )

  return (
    <div>
      <FormHeader title={'Edit Resident'} id_package={id_package} />
      {/*Form*/}
      <ResidentEditForm id_package={id_package} resident={resident} />
    </div>
  )
}

export default page
