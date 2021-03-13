import { min, max } from 'd3'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useType } from '../../hooks'
import { elevation } from '../styled/utilities'

type InteractionProps = {
    className: string,
    data: object,
    interaction: string
    setFilter: any
}

const Interaction = ({
  className, data, interaction, setFilter,
}: InteractionProps) => {
  const [state, setState] = useState(0)
  // create an accessor
  const getInteractive = (d: object) => d[interaction]
  const { types } = useType(data)
  const type = types.filter((t) => t.variable === interaction).map((t) => t.type).toString()

  const handleChange = (value: number) => {
    const filtered = data.filter((d) => getInteractive(d) >= value)
    setFilter(filtered)
  }

  useEffect(() => {
    handleChange(state)
  }, [state])

  if (type === 'number') {
    return (
      <div className={className}>
        <span>{interaction}</span>
        <input type="range" onChange={(e) => setState(e.target.value)} min={min(data, getInteractive)} max={max(data, getInteractive)} />
        <span>{state}</span>
      </div>
    )
  }

  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default styled(Interaction)`
  ${elevation[1]};
  background: var(--color-foreground);
  padding: 10px 20px;
  display: flex;
  place-items: center;
`
