import styled from 'styled-components'
import { useState } from 'react'
import VisControl from './controls/visControl'
import StyleControls from './controls/styleControls'
import ShareControls from './controls/shareControl'
import DataControls from './controls/dataControls'
import { elevation } from '../styled/utilities'

type ControlsProps = {
    className: string
    data: any[]
}

const Controls = ({ className, data }: ControlsProps) => {
  const [open, setOpen] = useState('data')

  return (
    <div className={className}>
      <DataControls datasets={data} open={open === 'data'} setOpen={setOpen} />
      <VisControl open={open === 'visualisation'} setOpen={setOpen} />
      <StyleControls open={open === 'style'} setOpen={setOpen} />
      <ShareControls open={open === 'share'} setOpen={setOpen} />
    </div>
  )
}

export default styled(Controls)`
  ${elevation[1]};
  height: 100%;
  background: var(--color-foreground);
`
