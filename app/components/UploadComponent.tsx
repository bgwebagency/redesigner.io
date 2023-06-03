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

export default function UploadComponent() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
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
          }
        }}
        // onComplete={(files) => alert(files.map((x) => x.fileUrl).join('\n'))}
        width="600px"
        height="375px"
      />
      {imageUrl && <img src={imageUrl} alt="Restored image" />}
    </>
  )
}
