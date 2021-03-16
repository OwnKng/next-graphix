import styled from 'styled-components'
import { Menu } from '../../styled/elements/Menu'
import Control from '../../styled/elements/Control'
import { Heading } from '../../styled/elements/Heading'
import { ButtonOptions } from '../../styled/elements/ButtonOptions'
import { useSelections, useActive } from '../../../hooks'
import { Panel } from '../../styled/elements/Panel'

const StyleControls = ({ open, setOpen }) => {
  const { updateSelections, styles } = useSelections()
  const { active } = useActive('palette')
  const { active: activeTheme } = useActive('theme')

  const orientation = styles.xAxis.textDirection

  return (
    <Menu>
      <Heading onClick={() => setOpen('style')}>Style</Heading>
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
        <span>X-Axis</span>
        <Panel>
          <input
            id="x-text-orientation"
            type="checkbox"
            checked={orientation === 'vertical'}
            onChange={() => (orientation === 'horizontal'
              ? updateSelections({ styles: { ...styles, xAxis: { textDirection: 'vertical' } } })
              : updateSelections({ styles: { ...styles, xAxis: { textDirection: 'horizontal' } } }))}
          />
          <label htmlFor="x-text-orientation">Flip x-axis text</label>
        </Panel>
      </Control>
    </Menu>
  )
}

export default styled(StyleControls)`
label {
  color: var(--color-paragraph);
  margin-left: 10px;
}
`
