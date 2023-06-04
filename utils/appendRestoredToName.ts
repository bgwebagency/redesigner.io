const appendRestoredToName = (name: string): string => {
  const restored = '-restored'
  const dot = '.'
  const splitName = name.split(dot)
  const splitNameLength = splitName.length
  const restoredName = splitName
    .slice(0, splitNameLength - 1)
    .concat(restored)
    .concat(splitName[splitNameLength - 1])
    .join(dot)
  return restoredName
}
