import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/siderbar/Sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex bg-[#EDEDED]`}
      >
        <Sidebar />
        <div className="flex-1 ml-[320px] mr-[40px]">{children}</div>
      </body>
    </html>
  )
}
