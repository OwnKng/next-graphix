import { Circle } from '@visx/shape'
import { scaleLinear } from '@visx/scale'
import { extent } from 'd3'

type marginType = {
    top: number,
    left: number,
    right: number,
    bottom: number
}

type ScatterProps = {
    data: any[],
    x: string,
    y: string,
    width: number,
    height: number,
    margin: marginType
}

const Scatter = ({
  data,
  x,
  y,
  width,
  height,
  margin = {
    top: 20, left: 20, right: 20, bottom: 20,
  },
}: ScatterProps) => {
  // set dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // create accessor functions
  const getX = (d:[]) => d[x]
  const getY = (d:[]) => d[y]

  // create scales
  const xScale = scaleLinear({
    domain: extent(data, getX),
    range: [margin.left, innerWidth - margin.left],
  })

  const yScale = scaleLinear({
    domain: extent(data, getX),
    range: [margin.top, innerHeight],
  })

  // return chart

  return (
    <svg width={innerWidth} height={innerHeight}>
      {data.map((point) => (
        <Circle
          key={`point-${point}`}
          cx={xScale(getX(point))}
          cy={yScale(getY(point))}
          r={4}
          fill="hotpink"
        />
      ))}
    </svg>
  )
}

export default Scatter
