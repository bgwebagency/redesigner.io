import { Analytics } from '@vercel/analytics/react'
import UploadComponent from './components/UploadComponent'

export default function Home() {
  return (
    <main>
      <h1>Restore Face</h1>
      <UploadComponent />
      <Analytics />
    </main>
  )
}
