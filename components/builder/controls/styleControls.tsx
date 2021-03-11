import { Menu } from '../../styled/elements/Menu'
import Control from '../../styled/elements/Control'
import { Heading } from '../../styled/elements/Heading'
import { ButtonOptions } from '../../styled/elements/ButtonOptions'
import { useSelections, useActive } from '../../../hooks'

const StyleControls = ({ open, setOpen }) => {
  const { updateSelections } = useSelections()
  const { active } = useActive('palette')
  const { active: activeTheme } = useActive('theme')

  return (
    <Menu>
      <div className="title" onClick={() => setOpen('style')}>
        <Heading>Style</Heading>
      </div>
      <Control open={open}>
        <h4>Style chart</h4>
        <span>Select Theme</span>
        <ButtonOptions
          style={{
            background: activeTheme === 'light' ? 'var(--color-selected)' : '',
            color: activeTheme === 'light' ? 'var(--color-heading)' : '',
          }}
          onClick={() => updateSelections({ theme: 'light' })}
        >
          Light Theme
        </ButtonOptions>
        <ButtonOptions
          style={{
            background: activeTheme === 'dark' ? 'var(--color-selected)' : '',
            color: activeTheme === 'dark' ? 'var(--color-heading)' : '',
          }}
          onClick={() => updateSelections({ theme: 'dark' })}
        >
          Dark Theme
        </ButtonOptions>
        <span>Select Color Palette</span>
        <ButtonOptions
          style={{
            background: active === 'default' ? 'var(--color-selected)' : '',
            color: active === 'default' ? 'var(--color-heading)' : '',
          }}
          onClick={() => updateSelections({ palette: 'default' })}
        >
          Default
        </ButtonOptions>
        <ButtonOptions
          style={{
            background: active === 'lancet' ? 'var(--color-selected)' : '',
            color: active === 'lancet' ? 'var(--color-heading)' : '',
          }}
          onClick={() => updateSelections({ palette: 'lancet' })}
        >
          Two
        </ButtonOptions>
      </Control>
    </Menu>
  )
}

export default StyleControls
