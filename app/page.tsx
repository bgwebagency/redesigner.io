import { Analytics } from '@vercel/analytics/react'
import UploadComponent from './components/UploadComponent'
import Header from './components/Header'
import Footer from './components/Footer'
import Banner from './components/Banner'

export default function Home() {
  return (
    <main className="container m-auto min-h-full">
      <Header />
      <Banner />
      <div className="min-h-full">
        <UploadComponent />
      </div>
      <Footer />
      <Analytics />
    </main>
  )
}
