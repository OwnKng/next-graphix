import { useActive } from '../../../hooks'
import { ButtonOptions } from '../../styled/elements/ButtonOptions'

const visGeo = ({ geometry, updateSelections }) => {
  const { active } = useActive('geometry')

  return (
    <ButtonOptions
      style={{
        background: geometry === active ? 'var(--color-selected)' : '',
        color: geometry === active ? 'var(--color-heading)' : '',
      }}
      onClick={(e) => updateSelections({ geometry: e.target.value })}
      value={geometry.toLowerCase()}
    >
      {geometry}
    </ButtonOptions>
  )
}

export default visGeo
