'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import RootLayout from '@/app/buildings/[id]/layout'

const ClientWrapper = (children) => {
  const pathname = usePathname()
  return <RootLayout {...children} currentPath={pathname} />
}

export default ClientWrapper
