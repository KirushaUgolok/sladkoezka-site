import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DataHandler } from './components/DataHandler'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Сладкоежка',
  description: 'Любимые десерты онлайн',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link
          rel="icon"
          href="https://em-content.zobj.net/thumbs/240/apple/325/shortcake_1f370.png"
          sizes="any"
        />
      </head>
      <body>
        {/* Client Component to handle client-side DataHandler functionality */}
        <ClientComponent>
          <DataHandler />
        </ClientComponent>
        {children}
      </body>
    </html>
  )
}

// Client Component for client-side DataHandler rendering
function ClientComponent({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}

