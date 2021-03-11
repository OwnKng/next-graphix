import { min, max, median } from 'd3'
import { useType } from '../../hooks'

type InteractionProps = {
    data: object,
    interaction: string
    setFilter: any
}

const Interaction = ({ data, interaction, setFilter }: InteractionProps) => {
  // establish an accessor
  const getInteractive = (d: object) => d[interaction]
  const { types } = useType(data)
  const type = types.filter((t) => t.variable === interaction).map((t) => t.type).toString()

  const handleChange = (value: number) => {
    const filtered = data.filter((d) => getInteractive(d) >= value)
    setFilter(filtered)
  }

  if (type === 'number') {
    return (
      <>
        <input type="range" onChange={(e) => handleChange(e.target.value)} min={min(data, getInteractive)} max={max(data, getInteractive)} />
      </>
    )
  }

  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default Interaction
