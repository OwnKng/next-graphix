import styled from 'styled-components'

type ControlsProps = {
    className: string
}

const Controls = ({ className }: ControlsProps) => {
  const shareChart = async () => {
    const data = {
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
      <h2>Controls</h2>
      <button onClick={() => shareChart()}>share chart</button>
    </div>
  )
}

export default styled(Controls)`
  border: 1px solid red;
  height: 100%;
`
