import { Montserrat } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400','500','600','700','800', '900'],
 })

export const metadata = {
  title: 'Movie List',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}