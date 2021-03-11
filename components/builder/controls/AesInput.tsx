import { ButtonOptions } from '../../styled/elements/ButtonOptions'
import { useActive } from '../../../hooks/useActive'

const AesInput = ({
  name, types, accepted, handleClick,
}) => {
  const { active } = useActive(name)

  return (
    <>
      {types
        .filter((t) => accepted.includes(t.type))
        .map((key) => (
          <ButtonOptions
            style={{
              background:
                key.variable === active ? 'var(--color-selected)' : '',
              color: key.variable === active ? 'var(--color-heading)' : '',
            }}
            key={`select-option-key-${key.variable}`}
            value={key.variable}
            onClick={() => handleClick({ [name]: key.variable })}
          >
            {key.variable}
          </ButtonOptions>
        ))}
    </>
  )
}
export default AesInput
