export const appendTextToName = (
	name: string,
	type: string,
	theme: string,
): string => {
	const predicted = `-${theme.toLowerCase().replace(' ', '-')}-${type
		.toLowerCase()
		.replace(' ', '-')}`
	const dot = '.'
	const splitName = name.split(dot)
	const splitNameLength = splitName.length
	const predictedName = splitName
		.slice(0, splitNameLength - 1)
		.concat(predicted)
		.concat(dot)
		.concat(splitName[splitNameLength - 1])
		.join('')
	return predictedName
}
