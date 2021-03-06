import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

const GlobalStyles = createGlobalStyle`
${normalize}

:root {
    --color-background: ${({ theme }) => theme.colors.background};
    --color-paragraph: ${({ theme }) => theme.colors.paragraph};
    --color-heading: ${({ theme }) => theme.colors.heading};
    --color-button: ${({ theme }) => theme.colors.button};
  }

  html {font-size: 100%} /*16px*/

  body {
    font-family: 'Saira', sans-serif;
    font-weight: 400;
    line-height: 1.75;
    height: 100vh;
    margin: 0px;
    box-sizing: border-box;
    color: var(--color-paragraph);
  }

`

export default GlobalStyles
