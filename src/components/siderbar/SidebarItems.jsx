'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SidebarItems = () => {
  const currentPath = usePathname()
  const sidebarItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      img: '/system-icons/chart.png',
      active_img: '/system-icons/chart-active.png',
    },
    {
      path: '/residents',
      label: 'Residents',
      img: '/system-icons/id-card.png',
      active_img: '/system-icons/id-card-active.png',
    },
    {
      path: '/buildings',
      label: 'Buildings',
      img: '/system-icons/building.png',
      active_img: '/system-icons/building-active.png',
    },
  ]
  return (
    <>
      {sidebarItems.map((item, index) => (
        <li
          key={index}
          className={`sidebar_items_container ${
            currentPath.startsWith(item.path) ? 'active' : ''
          }`}
        >
          <Link href={item.path} className="flex items-center">
            <img
              src={
                currentPath.startsWith(item.path) ? item.active_img : item.img
              }
              alt={item.label}
              className="w-[16px] mr-[24px]"
            />
            <div>{item.label}</div>
          </Link>
        </li>
      ))}
    </>
  )
}

export default SidebarItems
