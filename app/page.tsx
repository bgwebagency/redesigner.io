'use client'
import Image from 'next/image'
import { Button } from 'greenhouse-react-ui'
import { useRouter } from 'next/navigation'
import { useMediaQueries } from '@react-hook/media-query'

export default function Home() {
  const router = useRouter()
  const { matches } = useMediaQueries({
    md: 'only screen and (min-width: 768px)',
    xxl: 'only screen and (min-width: 1536px)',
  })

  return (
    <div className="mb-auto">
      <div className="flex flex-col justify-center mt-8 md:mt-14 2xl:mt-40">
        <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-bold text-center leading-tight">
          Bringing Old Photos Back to Life <br />
          <span className="text-primary">with AI</span>
        </h1>
        <p className="text-center mt-6 text-gray-400">
          No registration required. And entirely free!
        </p>
        <div className="text-center mt-6">
          <Button
            onClick={() => router.push('/generate')}
            layout="outline"
            className="tracking-wider"
          >
            Restore Image
          </Button>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-10 md:mt-14 2xl:mt-20">
        <div className="bg-white rounded-2xl p-2 2xl:p-4">
          <Image
            src={'/input1-blurred.jpg'}
            alt="Blurry portrait of Francis Ludicke"
            width={matches.xxl ? 400 : matches.md ? 250 : 300}
            height={matches.xxl ? 400 : matches.md ? 250 : 300}
          />
        </div>
        <div className="bg-white rounded-2xl p-2 2xl:p-4">
          <Image
            src={'/input1-restored.png'}
            alt="Restored portrait of Francis Ludicke"
            width={matches.xxl ? 400 : matches.md ? 250 : 300}
            height={matches.xxl ? 400 : matches.md ? 250 : 300}
          />
        </div>
      </div>
    </div>
  )
}
