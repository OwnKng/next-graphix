import styled from 'styled-components'
import { useState } from 'react'
import { useSelections } from '../../hooks'
import Scatter from '../visualisations/scatter'
import { elevation } from '../styled/utilities'
import Line from '../visualisations/Line'
import Bar from '../visualisations/Bar'

type VisualisationProps = {
    className: string
}

const Visualisation = ({ className }: VisualisationProps) => {
  const {
    selections, updateSelections,
  } = useSelections()

  return (
    <div className={className}>
      <div>
        <input className="title" value={selections.title} onChange={(e) => updateSelections({ title: e.target.value })} />
        <input className="subtitle" value={selections.subtitle} onChange={(e) => updateSelections({ subtitle: e.target.value })} />
      </div>
      <div className="viz">
        {selections.geometry === 'point' && (
          <Scatter {...selections} />
        )}
        {selections.geometry === 'line' && (
          <Line {...selections} />
        )}
        {selections.geometry === 'bar' && (
          <Bar {...selections} />
        )}
      </div>
    </div>
  )
}

export default styled(Visualisation)`
width: 100%;

input {
  background: var(--color-foreground);
  ${elevation[1]};
  display: block;
  width: 100%;
  border: none;
  padding: 5px 0px 5px 5px;
}

input:focus{
  outline: none;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 5px; 
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.viz {
  position: relative;
  height: 70vh;
  ${elevation[1]};
  padding-top: 10px;
  background: var(--color-foreground);
}

`
