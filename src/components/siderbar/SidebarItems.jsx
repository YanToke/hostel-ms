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
    },
    {
      path: '/residents',
      label: 'Residents',
    },
    {
      path: '/buildings',
      label: 'Buildings',
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
          <Link href={item.path}>{item.label}</Link>
        </li>
      ))}
    </>
  )
}

export default SidebarItems
