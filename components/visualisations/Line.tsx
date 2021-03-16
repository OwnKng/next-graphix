import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { scaleLinear, scaleOrdinal } from '@visx/scale'
import {
  extent, group, max, min,
} from 'd3'
import { LinePath, Bar, Line } from '@visx/shape'
import { AnimatedGridRows } from '@visx/react-spring'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { useCallback } from 'react'
import styled from 'styled-components'
import { palettes } from '../styled/utilities'
import AxisBottom from './AxisBottom'
import AxisLeft from './AxisLeft'
import Legend from './Legend'

const tooltipStyles = {
  ...defaultStyles,
  zIndex: 1,
}

const LineChart = ({
  data, x, y, color, palette, styles,
  className,
  width,
  height,
  theme,
  margin = {
    top: 60, left: 60, right: 30, bottom: 80,
  },
}) => {
  // Set dimensions
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.bottom - margin.top

  // Accessor functions
  const getX = (d) => d[x]
  const getY = (d) => d[y]
  const getColor = (d) => d[color]

  // Create scales
  const xScale = scaleLinear({
    domain: extent(data, getX),
    range: [margin.left, innerWidth + margin.left],
    clamp: true,
  })

  const yScale = scaleLinear({
    domain: extent(data, getY),
    range: [innerHeight + margin.top, margin.top],
    nice: true,
  })

  const colorScale = scaleOrdinal({
    domain: [...new Set(data.map(getColor))],
    range: palettes[palette],
  })

  // Group data
  const dataGrouped = Array.from(
    group(data, (d) => d[color]),
    ([key, value]) => ({ key, value }),
  )

  // Handle the tooltip
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip()

  // event handler
  const handleTooltip = useCallback(
    (event) => {
      const { x } = localPoint(event)
      let x0 = xScale.invert(x)

      // for mobile, prevents tooltip from crashing the app
      if (x0 > max(data, getX)) x0 = max(data, getX)
      if (x0 < min(data, getX)) x0 = min(data, getX)

      const d = data.filter((row) => Math.round(getX(row)) === Math.round(x0))

      if (d.length === 0) return null

      const { y } = localPoint(event)

      showTooltip({
        tooltipData: d,
        tooltipLeft: xScale(x0),
        tooltipTop: y,
      })
    },
    [data, showTooltip, xScale],
  )

  return (
    <div className={className}>
      <svg width={width} height={height} style={{ background: theme.background }}>
        {dataGrouped.map((data, i) => (
          <LinePath
            key={i}
            data={data.value}
            x={(d) => xScale(getX(d))}
            y={(d) => yScale(getY(d))}
            stroke={colorScale(data.key)}
          />
        ))}
        <g transform={`translate(${margin.left},0)`}>
          <AxisLeft scale={yScale} y={y} color={theme.stroke} />
          <AnimatedGridRows
            scale={yScale}
            stroke={theme.stroke}
            strokeWidth={0.2}
            width={innerWidth}
          />
        </g>
        <AxisBottom top={innerHeight + margin.top} scale={xScale} x={x} color={theme.stroke} styles={styles.xAxis} />
        <Bar
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          rx={14}
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={() => hideTooltip()}
        />
        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: margin.top }}
              to={{ x: tooltipLeft, y: innerHeight + margin.top }}
              stroke={theme.text}
              opacity={0.5}
              strokeWidth={1}
              pointerEvents="none"
            />
          </g>
        )}
      </svg>
      {x && y && tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop - 12}
          left={tooltipLeft + 12}
          style={tooltipStyles}
        >
          {tooltipData.length && (
            <>
              <h4 className="tooltip-title">{getX(tooltipData[0])}</h4>
              {tooltipData.map((d, i) => (
                <div
                  key={`tooltip-${i}`}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {color && (
                    <p style={{ color: colorScale(getColor(d)) }}>
                      {getColor(d)}
                    </p>
                  )}
                  <p>{getY(d)}</p>
                </div>
              ))}
            </>
          )}
        </TooltipWithBounds>
      )}
      {color !== 'none' ? (
        <Legend left={margin.left} scale={colorScale} color={theme.text} />
      ) : null}
    </div>
  )
}

const ChartWrapper = (props) => (
  <ParentSize>
    {({ width, height }) => (
      <LineChart className={props.className} width={width} height={height} {...props} />
    )}
  </ParentSize>
)

export default styled(ChartWrapper)`
  .tooltip-title {
    color: var(--color-background);
    text-align: center;
    font-weight: bold;
  }
`
