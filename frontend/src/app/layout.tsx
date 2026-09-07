import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chorcha - Online Exam & Preparation Platform',
  description: 'Prepare for competitive exams with live exams, practice tests, AI assistance, and archived questions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
