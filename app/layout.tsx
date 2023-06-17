'use client'
import './globals.css'
import { GreenHouse } from 'greenhouse-react-ui'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import { BuildingProvider } from './context/BuildingContext'
import { RoomProvider } from './context/RoomContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GreenHouse>
      <html lang="en">
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <title>Redesigner.io</title>
          <meta
            name="description"
            content="Redesign your house interior and exterior with AI for free!"
          />
          <meta property="og:site_name" content="redesigner.io" />
          <meta
            property="og:description"
            content="Redesign your house interior and exterior with AI for free"
          />
          <meta property="og:title" content="Redesigner" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Redesigner" />
          <meta
            name="twitter:description"
            content="Redesign your house interior and exterior with AI for free!"
          />
          <meta
            property="og:image"
            content="https://redesigner.io/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://redesigner.io/og-image.png"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          {/* @ts-ignore */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-sans">
          {' '}
          <main className="container m-auto min-h-screen flex flex-col px-4 md:px-0">
            <ErrorBoundary>
              <RoomProvider>
                <BuildingProvider>
                  <>
                    <Header />
                    {children}
                    <Footer />
                    <Analytics />
                  </>
                </BuildingProvider>
              </RoomProvider>
            </ErrorBoundary>
          </main>
        </body>
      </html>
    </GreenHouse>
  )
}
