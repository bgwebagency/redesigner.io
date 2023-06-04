import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import requestIp from 'request-ip'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '30 s'),
  analytics: true,
})

type Input = {
  image: string
  codeformer_fidelity: number
  face_upsample: Boolean
  background_enhance: Boolean
  upscale: number
}

export async function POST(request: Request) {
  // Use ip address for individual limits.
  const identifier = requestIp.getClientIp({ headers: {} })
  const { success, limit, remaining } = await ratelimit.limit(identifier!)
  const newHeaders = new Headers(request.headers)
  // TODO: Check how we can set this header in the response
  // Add a new header
  newHeaders.set('x-RateLimit-Limit', limit.toString())
  newHeaders.set('x-RateLimit-Remaining', remaining.toString())

  if (!success) {
    return NextResponse.json({
      errorCode: 'rate-limit-exceeded',
      errorMessage:
        'Unable to process at this time. Please try again in 30 seconds.',
    })
  }

  const req = await request.json()

  const { imageUrl } = req

  // start the image generation process
  const initResponse = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
    },
    body: JSON.stringify({
      version:
        '7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56',
      input: {
        image: imageUrl,
        codeformer_fidelity: 0.7,
        face_upsample: true,
        background_enhance: true,
        upscale: 2,
      },
    }),
  })

  type InitResponseJSON = {
    completed_at: null
    created_at: Date
    error: null
    id: string
    input: Input
    logs: null
    metrics: {}
    output: null
    started_at: null
    status: string
    version: string
  }

  const initResponseJson: InitResponseJSON = await initResponse.json()

  const { id } = initResponseJson

  // poll the API every 1 sec until the image is ready
  let restoredImageUrl = null

  type ImageResponseJSON = Pick<
    InitResponseJSON,
    'id' | 'input' | 'output' | 'status'
  >

  while (!restoredImageUrl) {
    let imageResponse = await fetch(
      `https://api.replicate.com/v1/predictions/${id}`,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      }
    )
    let imageResponseJson: ImageResponseJSON = await imageResponse.json()
    // console.log('imageResponseJson', JSON.stringify(imageResponseJson))
    if (imageResponseJson.status === 'succeeded') {
      restoredImageUrl = imageResponseJson.output
    } else if (imageResponseJson.status === 'failed') {
      throw new Error('Image generation failed')
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  // return the image
  // console.log('restoredImageUrl', restoredImageUrl)
  return NextResponse.json({
    restoredImageUrl: restoredImageUrl ?? 'Failed to generate image',
  })
}
