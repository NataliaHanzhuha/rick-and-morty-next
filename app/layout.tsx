import type { Metadata } from 'next'

// These styles apply to every route in the application
import './globals.css';
import { FC, ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const Layout: FC<layoutProps> = ({ children }) => {
  return <html lang="en">
    <body  suppressHydrationWarning={true} >{children}</body>
  </html>
}

export default Layout