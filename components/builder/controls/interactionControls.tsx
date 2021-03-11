import { Menu } from '../../styled/elements/Menu'
import Control from '../../styled/elements/Control'
import { Heading } from '../../styled/elements/Heading'
import { useSelections, useActive } from '../../../hooks'
import { ButtonOptions } from '../../styled/elements/ButtonOptions'

const InteractionControls = ({ open, setOpen }) => {
  const { data, updateSelections } = useSelections()
  const keys = Object.keys(data[0])
  const { active } = useActive('interaction')

  return (
    <Menu>
      <div className="title" onClick={() => setOpen('interaction')}>
        <Heading>interaction</Heading>
      </div>
      <Control open={open}>
        <h3>Set interaction</h3>
        <ButtonOptions
          style={{
            background: active === 'none' ? 'var(--color-selected)' : '',
            color: active === 'none' ? 'var(--color-heading)' : '',
          }}
          onClick={() => updateSelections({ interaction: 'none' })}
        >
          None
        </ButtonOptions>
        {keys.map((key) => (
          <ButtonOptions
            style={{
              background:
              key === active ? 'var(--color-selected)' : '',
              color: key === active ? 'var(--color-heading)' : '',
            }}
            onClick={(e) => updateSelections({ interaction: e.target.value })}
            value={key}
          >
            {key}
          </ButtonOptions>
        ))}
      </Control>
    </Menu>
  )
}

export default InteractionControls
