import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./global.scss"
import NavBar from '@/components/NavBar/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Providers & Materials',
  description: 'A site for appling for a job',
}

export const revalidate = 10;

/**
 * Корневой слой для всех созданных страниц
 * @param children Дочерний элемент
 * @returns Страницу, видимую для пользователя
 */
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
