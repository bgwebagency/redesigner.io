'use client'

import { useState } from 'react'
import { UploadDropzone } from 'react-uploader'
import { Uploader } from 'uploader'

if (!process.env.NEXT_PUBLIC_UPLOAD_IO_API_KEY)
  throw new Error('UPLOAD_IO_API_KEY is not set')

const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_IO_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_IO_API_KEY
    : 'free',
  // apiKey: 'free',
}) // Your real API key.

// Initialize once (at the start of your app).

const uploaderOptions = {
  maxFileCount: 1,
  mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  editor: { images: { crop: false } },
  // multi: true,

  // Comment out this line & use 'onUpdate' instead of
  // 'onComplete' to have the dropzone close after upload.
  // showFinishButton: true,

  styles: {
    colors: {
      primary: '#377dff',
    },
  },
}

type RestoreResponse = {
  restoredImageUrl: string
}

export default function UploadComponent() {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null)

  async function restoreImage(imageUrl: string) {
    try {
      setLoading(true)
      const response = await fetch('/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      })
      const data: RestoreResponse = await response.json()
      setRestoredImageUrl(data.restoredImageUrl)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <>
      <UploadDropzone
        uploader={uploader}
        options={uploaderOptions}
        onUpdate={(files) => {
          if (files.length === 0) {
            console.log('No files selected.')
          } else {
            console.log('File selected: ', files[0].fileUrl)
            setImageUrl(files[0].fileUrl)
            restoreImage(files[0].fileUrl)
          }
        }}
        // onComplete={(files) => alert(files.map((x) => x.fileUrl).join('\n'))}
        width="600px"
        height="375px"
      />
      {/* https://upcdn.io/12a1yJB/raw/uploads/2023/06/04/PASSPORT_PHOTO-5wmg.jpg */}
      {imageUrl && <img src={imageUrl} alt="Main image" />}
      {restoredImageUrl && <img src={restoredImageUrl} alt="Restored image" />}
      {/* https://replicate.delivery/pbxt/FeUR3TUZGM0GFSEx7FgWbkwWXSkwEP3PeMS99emefZKdDETIC/output.png */}
    </>
  )
}
