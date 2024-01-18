import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./global.scss"
import NavBar from '@/components/NavBar/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'First Task',
  description: 'First task for appling to a job',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/> 
        {children}

      </body>
    </html>
  )
}
