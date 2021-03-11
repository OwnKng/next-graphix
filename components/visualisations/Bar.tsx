import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { format, bisectRight, max } from 'd3'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'

import { AnimatedGridRows } from '@visx/react-spring'
import { useCallback } from 'react'
import { useTooltip, TooltipWithBounds } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import Legend from './Legend'
import AxisBottom from './AxisBottom'
import { useSelections } from '../../hooks'
import AxisLeft from './AxisLeft'
import { palettes } from '../styled/utilities'

const BarChart = ({
  data, x, y, color, reordered, palette,
  width,
  height,
  margin = {
    top: 60, left: 60, right: 30, bottom: 80,
  },
}) => {
  const barData = [...data]

  if (reordered) barData.sort((a, b) => b[y] - a[y])

  // Set dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.bottom - margin.top

  // Accessor functions
  const getX = (d) => d[x]
  const getY = (d) => d[y] ?? 0
  const getColor = (d) => d[color]

  // Create scales
  const xScale = scaleBand({
    domain: [...new Set(barData.map(getX))],
    range: [margin.left, innerWidth + margin.left],
    padding: 0.1,
  })

  const yScale = scaleLinear({
    domain: [0, max(barData, getY)],
    range: [innerHeight + margin.top, margin.top],
    nice: true,
  })

  const colorScale = scaleOrdinal({
    domain: [...new Set(barData.map(getColor))],
    range: palettes[palette],
  })

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip()

  const handleTooltip = useCallback(
    (event) => {
      const { x: xPos } = localPoint(event)
      const range = xScale.domain().map(xScale)
      const index = bisectRight(range, xPos)
      const xKeys = barData.map((d) => getX(d))

      const selected = barData.filter((d) => getX(d) === xKeys[index - 1])
      const yMax = max(selected, getY)

      showTooltip({
        tooltipData: selected,
        tooltipLeft: xScale(xKeys[index - 1]),
        tooltipTop: yScale(yMax),
      })
    },
    [barData, getX, getY, showTooltip, xScale, yScale],
  )

  // Return the chart
  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},0)`}>
          <AxisLeft scale={yScale} y={y} />
          <AnimatedGridRows
            scale={yScale}
            stroke="var(--color-paragraph)"
            strokeWidth={0.2}
            width={innerWidth}
          />
        </g>
        <Group>
          {barData.map((d, i) => {
            const barWidth = xScale.bandwidth()
            const barHeight = innerHeight + margin.top - yScale(getY(d))
            const barX = xScale(getX(d))
            const barY = innerHeight + margin.top - barHeight
            return (
              <Bar
                key={`bar-${i}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={colorScale(getColor(d))}
              />
            )
          })}
        </Group>
        <AxisBottom
          x={x}
          top={innerHeight + margin.top}
          animated={false}
          scale={xScale}
        />
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={() => hideTooltip()}
        />
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop - 40}
          left={tooltipLeft}
        >
          {tooltipData.map((row) => (
            <div>
              <p>{getX(row)}</p>
              <span>{format(',d')(getY(row))}</span>
            </div>
          ))}
        </TooltipWithBounds>
      )}
      {color !== 'none' ? (
        <Legend left={margin.left} scale={colorScale} />
      ) : null}
    </>
  )
}

const ChartWrapper = (props) => (
  <ParentSize>
    {({ width, height }) => <BarChart width={width} height={height} {...props} />}
  </ParentSize>
)

export default ChartWrapper
