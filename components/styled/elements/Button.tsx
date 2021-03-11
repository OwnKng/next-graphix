import styled from 'styled-components'
import { elevation } from '../utilities'

export const Button = styled.button`
  padding: 10px 12px;
  border-radius: 6px;
  border: none;
  margin: 10px 0px;
  ${elevation[1]};
  background: var(--color-button);
  color: var(--color-button-text);
  font-size: 1.2rem;
  transition: background 0.2s ease;

  :focus {
    outline: none;
  }

  :hover {
    background: var(--color-button-hover);
  }
`
