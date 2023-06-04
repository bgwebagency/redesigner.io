import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
      <title>Restore Face</title>
      <meta
        name="description"
        content="Restore old and blurry face photos with AI for free."
      />
      <meta property="og:site_name" content="restoreface.io" />
      <meta
        property="og:description"
        content="Restore old and blurry face photos with AI for free."
      />
      <meta property="og:title" content="Restore Face" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Restore Face" />
      <meta
        name="twitter:description"
        content="Restore old and blurry face photos with AI for free."
      />
      <meta
        property="og:image"
        content="https://restore-photos.vercel.app/og-image.png"
      />
      <meta
        name="twitter:image"
        content="https://restore-photos.vercel.app/og-image.png"
      />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
