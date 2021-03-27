import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Circle } from '@visx/shape'
import { scaleOrdinal } from '@visx/scale'
import { AnimatedGridRows } from '@visx/react-spring'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { voronoi } from '@visx/voronoi'
import { useRef, useMemo, useCallback } from 'react'
import { useScale } from '../../hooks'
import { palettes } from '../styled/utilities'

import AxisLeft from './AxisLeft'
import AxisBottom from './AxisBottom'

import Legend from './Legend'

type ScatterProps = {
  data: any[],
  x: string,
  y: string,
  label: string,
  color: string,
  geometry: string,
  palette: string,
  styles: string,
  theme: string,
  width: number,
  height: number,
  margin: {top: number, left: number, right: number, bottom: number}
}

const Scatter = ({
  data,
  x,
  y,
  label,
  color,
  geometry,
  palette,
  styles,
  theme,
  width,
  height,
  margin = {
    top: 60, left: 60, right: 30, bottom: 80,
  },
}: ScatterProps) => {
  // Set dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.bottom - margin.top

  // Accessor functions
  const getX = (d) => d[x]
  const getY = (d) => d[y]
  const getLabel = (d) => d[label]
  const getColor = (d) => d[color]

  // Create scales
  const [xScale] = useScale(data, getX)
  const [yScale] = useScale(data, getY)
  xScale.range([margin.left, innerWidth + margin.left])
  yScale.range([innerHeight + margin.top, margin.top])

  const colorScale = scaleOrdinal({
    domain: [...new Set(data.map(getColor))],
    range: palettes[palette],
  })

  // Handle the tooltip
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipOpen,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip()

  const svgRef = useRef(null)

  const voronoiLayout = useMemo(
    () => voronoi({
      x: (d) => xScale(getX(d)) ?? 0,
      y: (d) => yScale(getY(d)) ?? 0,
      width,
      height,
    })(data),
    [data, width, height, getX, getY, xScale, yScale],
  )

  let tooltipTimeout: any

  const handleMouseMove = useCallback(
    (event) => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout)
      if (!svgRef.current) return
      const point = localPoint(svgRef.current, event)
      if (!point) return
      const neighborRadius = 100
      const closest = voronoiLayout.find(point.x, point.y, neighborRadius)
      if (closest) {
        showTooltip({
          tooltipLeft: xScale(getX(closest.data)),
          tooltipTop: yScale(getY(closest.data)),
          tooltipData: closest.data,
        })
      }
    },
    [getX, getY, xScale, yScale, showTooltip, voronoiLayout, tooltipTimeout],
  )

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip()
    }, 1500)
  }, [hideTooltip])

  // Return the chart
  return (
    <>
      <svg width={width} height={height} ref={svgRef} style={{ background: theme.background }}>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseLeave}
        />
        <g transform={`translate(${margin.left},0)`}>
          <AxisLeft scale={yScale} y={y} color={theme.text} />
          <AnimatedGridRows
            scale={yScale}
            stroke={theme.stroke}
            strokeWidth={0.2}
            width={innerWidth}
          />
        </g>
        <AxisBottom
          x={x}
          top={innerHeight + margin.top}
          scale={xScale}
          color={theme.text}
          styles={styles.xAxis}
          ticks={width > 600 ? 5 : 2}
        />
        {geometry === 'point'
          && data.map((point, i) => (
            <Circle
              key={`point-${i}`}
              cx={xScale(getX(point))}
              cy={yScale(getY(point))}
              r={4}
              fill={colorScale(getColor(point))}
              stroke={point === tooltipData ? 'var(--color-heading)' : 'none'}
            />
          ))}
      </svg>
      {label !== 'none'
        && tooltipOpen
        && tooltipData
        && tooltipLeft != null
        && tooltipTop != null && (
          <TooltipWithBounds
            left={tooltipLeft}
            top={tooltipTop}
            style={defaultStyles}
          >
            <p
              style={{
                color: colorScale(getColor(tooltipData)),
                paddding: 0,
                margin: 0,
              }}
            >
              {getLabel(tooltipData)}
            </p>
          </TooltipWithBounds>
      )}
      {color !== 'none' ? (
        <Legend left={margin.left} scale={colorScale} color={theme.text} />
      ) : null}
    </>
  )
}

const ChartWrapper = (props: any) => (
  <ParentSize>
    {({ width, height }) => <Scatter width={width} height={height} {...props} />}
  </ParentSize>
)

export default ChartWrapper
