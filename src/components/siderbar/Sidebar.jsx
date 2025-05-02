import React from 'react'
import SidebarItems from './SidebarItems'

const Sidebar = () => {
  return (
    <div className="min-w-[280px] bg-[#ffffff] shadow-lg h-[100vh] fixed">
      <div className="pt-[28px] pl-[28px]">
        <h1 className="text-[32px] font-bold">Hostel</h1>
        <span className="text-[16px] font-bold">Management System</span>
      </div>
      <ul className="mt-[24px]">
        <SidebarItems />
      </ul>
    </div>
  )
}

export default Sidebar
