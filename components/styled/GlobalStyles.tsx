import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

const GlobalStyles = createGlobalStyle`
${normalize}

:root {
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-background: ${({ theme }) => theme.colors.background};
    --color-foreground: ${({ theme }) => theme.colors.foreground};
    --color-middleground: ${({ theme }) => theme.colors.middleground};
    --color-accent: ${({ theme }) => theme.colors.accent};
    --color-userInput: ${({ theme }) => theme.colors.userInput};
    --color-paragraph: ${({ theme }) => theme.colors.paragraph};
    --color-heading: ${({ theme }) => theme.colors.heading};
    --color-button: ${({ theme }) => theme.colors.button};
    --color-button-text: ${({ theme }) => theme.colors.buttonText};
    --color-selected: ${({ theme }) => theme.colors.selected};
    --color-button-hover: ${({ theme }) => theme.colors.buttonHover};
    --levels-highest: ${({ theme }) => theme.levels.highest}
  }

  html {font-size: 100%} /*16px*/

  body {
    background: var(--color-background);
    font-family: 'Saira', sans-serif;
    font-weight: 400;
    line-height: 1.75;
    margin: 0px;
    box-sizing: border-box;
    color: var(--color-paragraph);
  }

`

export default GlobalStyles
