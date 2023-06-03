import type { NextApiRequest, NextApiResponse } from 'next'

type ExtendedNextApiRequest = NextApiRequest & {
  body: {
    imageUrl: string
  }
}

type Input = {
  image: string
  codeformer_fidelity: number
  face_upsample: Boolean
  background_enhance: Boolean
  upscale: number
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { imageUrl } = req.query

  // start the image generation process
  const initResponse = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
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
  let restoredImage = null

  type ImageResponseJSON = Pick<
    InitResponseJSON,
    'id' | 'input' | 'output' | 'status'
  >

  while (!restoredImage) {
    let imageResponse = await fetch(
      `https://api.replicate.com/v1/predictions/${id}`,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        },
      }
    )
    let imageResponseJson: ImageResponseJSON = await imageResponse.json()
    if (imageResponseJson.status === 'succeeded') {
      restoredImage = imageResponseJson.output
    } else if (imageResponseJson.status === 'failed') {
      throw new Error('Image generation failed')
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  // return the image
  res.status(200).json(restoredImage ?? 'Failed to generate image')
}
