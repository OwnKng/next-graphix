import styled from 'styled-components'
import { elevation } from '../utilities'

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--color-foreground);
    ${elevation[1]};
    border: 1px solid var(--color-border);
`
