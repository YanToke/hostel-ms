import StasticCard from '@/components/dashboard_page/StasticCard'
import UnpaidResidentsList from '@/components/dashboard_page/UnpaidResidentsList'
import React from 'react'

const page = async () => {
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/dashboard')
      const data = await res.json()
      return data
    } catch (error) {
      console.log('Failed to fetch Stastics Data')
    }
  }

  const stasticData = await fetchData()
  return (
    <div>
      <h1 className="text-[32px] font-bold mt-[40px] mb-[40px]">
        Thu Thet Thar
      </h1>
      <StasticCard stasticData={stasticData} />
      <UnpaidResidentsList unpaidResidents={stasticData.unpaidResidents} />
    </div>
  )
}

export default page
