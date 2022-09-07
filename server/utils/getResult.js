/**
 * Calculates the result of a game based on the pixel data and a reference image
 */
export const getResult = (team, reference) => {
  const referencePixels = reference.pixelData
  const teamImage = team.pixelData

  let count = 0

  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
      const isEqual = referencePixels[x][y] === teamImage[x][y]

      if (isEqual) {
        count++
      }
    }
  }

  const percent = (Math.round((count / 225) * 10_000) / 100).toFixed(2)

  return {
    percent,
    count,
  }
}
