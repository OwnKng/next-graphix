import { scaleLinear, scaleBand } from '@visx/scale'
import { extent } from 'd3'

export const useScale = (data, x) => {
  let scale

  const isNumeric = data
    .map(x)
    .filter((d) => d !== undefined)
    .every((x) => typeof x === 'number')

  if (isNumeric === true) {
    scale = scaleLinear({
      domain: extent(data, x),
      nice: true,
    })
  } else {
    scale = scaleBand({
      domain: [...new Set(data.map(x))],
      padding: 1,
    })
  }

  return [scale, isNumeric]
}
