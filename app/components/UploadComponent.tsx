'use client'

import Image from 'next/image'
import { useState } from 'react'
import { UploadDropzone } from 'react-uploader'
import { Uploader } from 'uploader'
import { downloadImg } from '../../utils/downloadImg'
import { appendRestoredToName } from '../../utils/appendRestoredToName'
import CompareSlider from './CompareSlider'
import Toggle from './Toggle'
import NSFWPredictor from '../../utils/nsfwCheck'
import va from '@vercel/analytics'
import { Button } from 'greenhouse-react-ui'
import { useMediaQuery } from '@react-hook/media-query'

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
      // TODO: Read these from the theme not hard coded
      primary: '#6ea83d',
    },
  },
  onValidate: async (file: File): Promise<string | undefined> => {
    // nsfw check
    let isSafe = false
    try {
      isSafe = await NSFWPredictor.isSafeImage(file)
    } catch (error) {
      console.error(error)
    }
    // track on vercel analytics if not safe with a custom event
    // https://vercel.com/docs/concepts/analytics/custom-events#tracking-an-event
    if (!isSafe) va.track('nsfw-image-blocked')

    return isSafe
      ? undefined
      : 'Detected a NSFW image. If this was a mistake, please contact me at https://twitter.com/kirankdash'
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
  const [imageName, setImageName] = useState<string | null>(null)
  const matches = useMediaQuery('only screen and (min-width: 768px)')

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
        throw new Error(
          'Too many uploads recently. Try again in a few minutes.'
        )
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
    if (!restoredImageUrl || !imageName)
      throw new Error('No restored image found. Try Again!')
    setDownloading(true)
    const fileName = appendRestoredToName(imageName)
    await downloadImg(restoredImageUrl, fileName)
    setDownloading(false)
  }

  const resetFields = () => {
    setImageUrl(null)
    setRestoredImageUrl(null)
    setRestoredImageLoaded(false)
    setImageName(null)
  }

  return (
    <div className="flex items-center flex-col mx-auto md:mt-12 w-full">
      {loading && <p>Loading...</p>}
      {imageUrl && restoredImageUrl && (
        <>
          <div className="flex gap-4 md:gap-10 justify-center items-center">
            <span>Split view</span>
            <Toggle
              enabled={sidebyside}
              setEnabled={(val) => setSidebyside(val)}
            />
            <span>Slider view</span>
          </div>
          {!sidebyside && (
            <CompareSlider
              original={imageUrl}
              restored={restoredImageUrl}
              classNames={`w-[${
                matches ? 400 : 300
              }px] flex justify-center items-center`}
              // TODO: Fix ts error
              // @ts-ignore
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
              setImageName(files[0].originalFile.originalFileName)
              setImageUrl(files[0].fileUrl)
              restoreImage(files[0].fileUrl)
            }
          }}
          // onComplete={(files) => alert(files.map((x) => x.fileUrl).join('\n'))}
          width="600px"
          height="375px"
          className="mx-auto"
        />
      )}
      <div className="flex flex-col md:flex-row md:gap-10 justify-center align-center">
        {sidebyside && (
          <>
            {/* https://upcdn.io/12a1yJB/raw/uploads/2023/06/04/PASSPORT_PHOTO-5wmg.jpg */}
            {imageUrl && (
              <div className="flex flex-col">
                <Image
                  src={imageUrl}
                  alt="Main image"
                  width={matches ? 400 : 300}
                  height={matches ? 400 : 300}
                />
                <Button
                  onClick={resetFields}
                  className="mt-5 md:mt-10"
                  size={matches ? 'small' : 'medium'}
                >
                  Upload another image
                </Button>
              </div>
            )}
            {restoredImageUrl && (
              // <a href={restoredImageUrl} target="_blank" rel="noreferrer">
              <div className="flex flex-col mt-5 md:mt-0">
                <Image
                  src={restoredImageUrl}
                  alt="Restored image"
                  width={matches ? 400 : 300}
                  height={matches ? 400 : 300}
                  onLoad={() => setRestoredImageLoaded(true)}
                />
                {/* TODO: Fix sonarlint warning */}
                {restoredImageLoaded && (
                  <Button
                    onClick={downloadRestoredImg}
                    className="mt-5 md:mt-10"
                    size={matches ? 'small' : 'medium'}
                  >
                    {downloading
                      ? 'Downloading Restored Image'
                      : 'Download Restored Image'}
                  </Button>
                )}
                {/* https://replicate.delivery/pbxt/FeUR3TUZGM0GFSEx7FgWbkwWXSkwEP3PeMS99emefZKdDETIC/output.png */}
              </div>

              // </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}
