import { AnimatedAxis } from '@visx/react-spring'
import { AxisBottom as AxisBottomVisx } from '@visx/axis'
import { format } from 'd3'

const AxisBottom = ({
  top, animated = true, scale, x, color, styles, ticks = 2,
}) => {
  if (animated) {
    return (
      <AnimatedAxis
        top={top}
        orientation="bottom"
        scale={scale}
        stroke={color}
        tickStroke={color}
        numTicks={ticks}
        tickFormat={format('d')}
        label={x}
        labelProps={{
          fill: color,
          fontSize: '0.8rem',
        }}
        tickLabelProps={() => ({
          fill: color,
          fontSize: 12,
          textAnchor: styles.textDirection === 'horizontal' ? 'middle' : 'start',
          transform: styles.textDirection === 'horizontal' ? 'none' : 'rotate(90)',
        })}
      />
    )
  }
  return (
    <AnimatedAxis
      top={top}
      orientation="bottom"
      scale={scale}
      label={x}
      numTicks={scale.domain().length}
      stroke={color}
      tickStroke={color}
      labelProps={{
        fill: color,
        fontSize: '0.8rem',
      }}
      tickLabelProps={() => ({
        fill: color,
        fontSize: 12,
        textAnchor: styles.textDirection === 'horizontal' ? 'middle' : 'start',
        transform: styles.textDirection === 'horizontal' ? 'none' : 'rotate(90)',
      })}
    />
  )
}

export default AxisBottom
