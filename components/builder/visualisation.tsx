import styled from 'styled-components'
import { useSelections } from '../../hooks'
import Scatter from '../visualisations/scatter'
import { elevation, Light, Dark } from '../styled/utilities'
import Line from '../visualisations/Line'
import Bar from '../visualisations/Bar'

type VisualisationProps = {
    className: string
}

const Visualisation = ({ className }: VisualisationProps) => {
  const {
    selections, updateSelections,
  } = useSelections()

  const theme = selections.theme === 'dark' ? Dark : Light

  return (
    <div className={className}>
      <div>
        <input
          className="title"
          style={{
            background: theme.background,
            color: theme.text,
          }}
          value={selections.title}
          onChange={(e) => updateSelections({ title: e.target.value })}
        />
        <input
          className="subtitle"
          style={{
            background: theme.background,
            color: theme.text,
          }}
          value={selections.subtitle}
          onChange={(e) => updateSelections({ subtitle: e.target.value })}
        />
      </div>
      <div className="viz">
        {selections.geometry === 'point' && (
          <Scatter {...selections} theme={theme} />
        )}
        {selections.geometry === 'line' && (
          <Line {...selections} theme={theme} />
        )}
        {selections.geometry === 'bar' && (
          <Bar {...selections} theme={theme} />
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
  background: var(--color-foreground);
  position: relative;
  height: 70vh;
  ${elevation[1]};
}`
