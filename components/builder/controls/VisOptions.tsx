import styled from 'styled-components'
import { useType, useActive } from '../../../hooks'
import AesInput from './AesInput'
import { ButtonOptions } from '../../styled/elements/ButtonOptions'
import { Panel } from '../../styled/elements/Panel'

const VisOptions = ({
  className,
  data,
  x,
  y,
  color,
  reordered,
  label,
  reorder,
  handleClick,
}) => {
  const { types } = useType(data)
  const { active } = useActive('color')
  const { active: activeLabel } = useActive('label')

  if (!x) return null

  return (
    <div className={className}>
      <Panel>
        <span>Select X</span>
        <AesInput
          name="x"
          types={types}
          accepted={x}
          handleClick={handleClick}
        />
      </Panel>
      <Panel>
        <span>Select Y</span>
        <AesInput
          name="y"
          types={types}
          accepted={y}
          handleClick={handleClick}
        />
      </Panel>
      {color && (
        <Panel>
          <span>Color By</span>
          <ButtonOptions
            style={{
              background: active === 'none' ? 'var(--color-selected)' : '',
              color: active === 'none' ? 'var(--color-heading)' : '',
            }}
            onClick={() => handleClick({ color: 'none' })}
          >
            None
          </ButtonOptions>
          <AesInput
            name="color"
            types={types}
            accepted={color}
            handleClick={handleClick}
          />
        </Panel>
      )}
      {label && (
        <Panel>
          <span>Label (for tooltip)</span>
          <ButtonOptions
            style={{
              background: activeLabel === 'none' ? 'var(--color-selected)' : '',
              color: activeLabel === 'none' ? 'var(--color-heading)' : '',
            }}
            onClick={() => handleClick({ label: 'none' })}
          >
            None
          </ButtonOptions>
          <AesInput
            name="label"
            types={types}
            accepted={label}
            handleClick={handleClick}
          />
        </Panel>
      )}
      {reorder && (
        <Panel>
          <input
            type="checkbox"
            checked={reordered}
            onChange={() => handleClick({ reordered: !reordered })}
            id="reorder"
          />
          <label htmlFor="reorder">Reorder bars</label>
        </Panel>
      )}
    </div>
  )
}

export default styled(VisOptions)`
  label {
    color: var(--color-paragraph);
    margin-left: 10px;
  }
`
