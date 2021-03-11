import styled from 'styled-components'
import { useState } from 'react'
import VisControl from './controls/visControl'
import StyleControls from './controls/styleControls'
import InteractionControls from './controls/interactionControls'
import ShareControls from './controls/shareControl'
import DataControls from './controls/dataControls'
import { elevation } from '../styled/utilities'

type ControlsProps = {
    className: string
}

const Controls = ({ className }: ControlsProps) => {
  const [open, setOpen] = useState('data')

  const shareChart = async () => {
    const data = {
      title: 'title',
      data: 'test',
      x: 'x',
      y: 'y',
      color: 'red',
      geometry: 'scatter',
      theme: 'default',
      palette: 'red',
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/graphics`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <div className={className}>
      <DataControls open={open === 'data'} setOpen={setOpen} />
      <VisControl open={open === 'visualisation'} setOpen={setOpen} />
      <InteractionControls open={open === 'interaction'} setOpen={setOpen} />
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
