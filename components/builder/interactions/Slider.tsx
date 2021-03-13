import ParentSize from '@visx/responsive/lib/components/ParentSize'
import AxisBottom from '../../visualisations/AxisBottom'
import { useScale } from '../../../hooks'

type SliderProps = {
    data: object,
    accessor: any,
    key: string,
    width: number,
    height: number
}

const Slider = ({
  data, accessor, key, width, height,
}: SliderProps) => {
  const [scale] = useScale(data, accessor)
  scale.range([0, width])

  return (
    <svg width={width} height={height}>
      <AxisBottom top={10} scale={scale} x={key} />
    </svg>
  )
}

const Wrapper = (props: any) => (
  <ParentSize>
    {({ width }) => <Slider width={width} height={100} {...props} />}
  </ParentSize>
)

export default Wrapper
