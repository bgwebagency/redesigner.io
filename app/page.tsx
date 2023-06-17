'use client'
import Image from 'next/image'
import { Button } from 'greenhouse-react-ui'
import { useRouter } from 'next/navigation'
import { useMediaQueries } from '@react-hook/media-query'
import React from 'react'
import Loading from './components/Loading'

export default function Home() {
  const router = useRouter()
  const { matches } = useMediaQueries({
    md: 'only screen and (min-width: 768px)',
    xxl: 'only screen and (min-width: 1536px)',
  })
  const [isLoading, setLoading] = React.useState(true)

  return (
    <div className="mb-auto">
      <div className="flex flex-col justify-center mt-8 md:mt-14 2xl:mt-40">
        <h1 className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-center leading-normal 2xl:leading-tight">
          Redesign your home <br />
          <span className="text-primary">with AI</span>
        </h1>
        <p className="text-center mt-6 text-gray-400">
          No registration required. And entirely free!
        </p>
        <p className="text-center mt-6 text-gray-400">
          <a
            href="https://youtu.be/4YXUGuo9OM4"
            target="_blank"
            rel={'noopener'}
            className="underline tracking-wider"
          >
            Learn How I built this
          </a>
        </p>
        <div className="flex gap-4 md:gap-6 justify-center">
          <div className="text-center mt-6">
            <Button
              onClick={() => {setLoading(true); router.push('/room')}}
              className="tracking-wider text-xs md:text-sm"
            >
              Redesign Room
            </Button>
          </div>
          <div className="text-center mt-6">
            <Button
              onClick={() => {setLoading(true); router.push('/building')}}
              layout="outline"
              className="tracking-wider text-xs md:text-sm"
            >
              Redesign Building
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-10 md:mt-14 2xl:mt-20">
        <div className="bg-white rounded-2xl p-2 2xl:p-4">
          <Image
            src={'/input.jpg'}
            alt="Original bedroom"
            width={matches.xxl ? 400 : matches.md ? 250 : 300}
            height={matches.xxl ? 400 : matches.md ? 250 : 300}
          />
        </div>
        <div className="bg-white rounded-2xl p-2 2xl:p-4">
          <Image
            src={'/input-predicted.jpg'}
            alt="Predicted bedroom"
            width={matches.xxl ? 400 : matches.md ? 250 : 300}
            height={matches.xxl ? 400 : matches.md ? 250 : 300}
          />
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  )
}
