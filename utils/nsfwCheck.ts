// nsfw check
import * as tf from '@tensorflow/tfjs'
import * as nsfwjs from 'nsfwjs'

tf.enableProdMode()

class NSFWPredictor {
	model: nsfwjs.NSFWJS | null = null
	constructor() {
		this.model = null
		this.loadModel()
	}

	async loadModel() {
		try {
			this.model = await nsfwjs.load(
				'https://www.redesigner.io/model/',
				// @ts-ignore
				{ type: 'graph' },
			)
		} catch (e) {
			console.log(e)
		}
	}

	predict(element: HTMLImageElement, guesses: number = 5) {
		if (!this.model) {
			throw new Error('Something went wrong. Please try again later.')
		}
		return this.model?.classify(element, guesses)
	}

	async predictImage(file: File, guesses: number = 5) {
		const url = URL.createObjectURL(file)
		try {
			const img = document.createElement('img')
			img.width = 400
			img.height = 400
			img.src = url
			return await new Promise<nsfwjs.predictionType[]>((resolve, reject) => {
				img.onload = async () => {
					const predictions = await this.predict(img, guesses)
					URL.revokeObjectURL(url)
					resolve(predictions)
				}
			})
		} catch (e) {
			console.error(e)
			URL.revokeObjectURL(url)
			throw e
		}
	}

	async isSafeImage(file: File) {
		try {
			const predictions = await this.predictImage(file, 3)
			const pornPrediction = predictions.find(p => p.className === 'Porn')
			const hentaiPrediction = predictions.find(p => p.className === 'Hentai')

			// If we can't find either of these predictions, we'll assume it's safe
			if (!pornPrediction || !hentaiPrediction) return true

			// If either of these predictions are above 25%, we'll assume it's unsafe
			return !(
				pornPrediction.probability > 0.25 || hentaiPrediction.probability > 0.25
			)
		} catch (e) {
			console.error(e)
			return false
		}
	}
}

export default new NSFWPredictor()
