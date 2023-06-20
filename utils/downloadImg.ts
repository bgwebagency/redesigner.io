const downloadImg = async (url: string, name: string) => {
	// fetch blob from url
	await fetch(url, {
		headers: new Headers({
			Origin: window.location.origin,
		}),
		mode: 'cors',
	})
		.then(response => response.blob())
		.then(blob => {
			// create blob link
			const blobLink = URL.createObjectURL(blob)

			// create element
			const downloadLink = document.createElement('a')

			// set file name
			const fileName = name

			// set href link
			downloadLink.href = blobLink

			// set download attribute
			downloadLink.download = fileName

			// append element
			document.body.appendChild(downloadLink)

			// trigger click event
			downloadLink.click()

			// remove element
			document.body.removeChild(downloadLink)
		})
		.catch(error => {
			console.error(error)
			throw new Error('Failed to download image')
		})
}

export { downloadImg }
