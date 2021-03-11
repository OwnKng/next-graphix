import styled from 'styled-components'
import { Menu } from '../../styled/elements/Menu'
import Control from '../../styled/elements/Control'
import { Heading } from '../../styled/elements/Heading'
import { useSelections } from '../../../hooks/useSelections'
import { visOptions } from '../../visualisations/visOption'
import VisGeo from './visGeo'
import VisOptions from './VisOptions'

const Panel = styled.div`
  display: flex;
  margin: 10px 0px;

  button {
    flex: 1;
    text-align: center;
  }
`

const VisControl = ({ open, setOpen }) => {
  const {
    data, reordered, geometry, updateSelections,
  } = useSelections()

  return (
    <Menu>
      <div className="title" onClick={() => setOpen('visualisation')}>
        <Heading>Visualisation</Heading>
      </div>
      <Control open={open}>
        <h4>Geometry</h4>
        <Panel>
          {Object.keys(visOptions).map((geo) => (
            <VisGeo
              key={geo}
              geometry={geo}
              updateSelections={updateSelections}
            />
          ))}
        </Panel>
        <h4>Options</h4>
        <div>
          <VisOptions
            data={data}
            reordered={reordered}
            handleClick={updateSelections}
            {...visOptions[geometry]}
          />
        </div>
      </Control>
    </Menu>
  )
}
export default VisControl
