'use client'

import Image from 'next/image'
import { useState } from 'react'
import { UploadDropzone } from 'react-uploader'
import { Uploader } from 'uploader'
import { downloadImg } from '../../utils/downloadImg'
import CompareSlider from './CompareSlider'
import Toggle from './Toggle'

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

type RestoreResponse = Response & {
  restoredImageUrl?: string
}

export default function UploadComponent() {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null)
  const [restoredImageLoaded, setRestoredImageLoaded] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [sidebyside, setSidebyside] = useState(true)

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
      if (data.status === 429) {
        throw new Error('Rate Limit exceeded. Try again in 30 seconds.')
      } else if (!data.restoredImageUrl) {
        throw new Error('No restored image found. Try Again!')
      }
      setRestoredImageUrl(data.restoredImageUrl)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const downloadRestoredImg = async () => {
    if (!restoredImageUrl)
      throw new Error('No restored image found. Try Again!')
    setDownloading(true)
    await downloadImg(restoredImageUrl, 'restoredPhoto.jpg')
    setDownloading(false)
  }

  if (loading) return <p>Loading...</p>

  return (
    <>
      {imageUrl && restoredImageUrl && (
        <>
          <Toggle
            enabled={sidebyside}
            setEnabled={(val) => setSidebyside(val)}
          />
          {!sidebyside && (
            <CompareSlider
              original={imageUrl}
              restored={restoredImageUrl}
              classNames="w-[400px]"
              portrait={true}
            />
          )}
        </>
      )}
      {!imageUrl && (
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
      )}
      <div className="flex gap-10">
        {sidebyside && (
          <>
            {/* https://upcdn.io/12a1yJB/raw/uploads/2023/06/04/PASSPORT_PHOTO-5wmg.jpg */}
            {imageUrl && (
              <Image src={imageUrl} alt="Main image" width={400} height={400} />
            )}
            {restoredImageUrl && (
              <a href={restoredImageUrl} target="_blank" rel="noreferrer">
                <Image
                  src={restoredImageUrl}
                  alt="Restored image"
                  width={400}
                  height={400}
                  onLoad={() => setRestoredImageLoaded(true)}
                />
              </a>
            )}
          </>
        )}
        {restoredImageLoaded && (
          <button onClick={() => downloadRestoredImg}>
            {downloading
              ? 'Downloading Restored Image'
              : 'Download Restored Image'}
          </button>
        )}
        {/* https://replicate.delivery/pbxt/FeUR3TUZGM0GFSEx7FgWbkwWXSkwEP3PeMS99emefZKdDETIC/output.png */}
      </div>
    </>
  )
}
