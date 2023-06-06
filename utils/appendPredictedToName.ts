export const appendPredictedToName = (name: string): string => {
  const predicted = '-predicted'
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
