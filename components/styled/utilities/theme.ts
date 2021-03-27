import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    primary: '#16161e',
    background: '#1a1b26',
    foreground: '#1e202e',
    middleground: '#F1F1F8',
    border: '#0d0f17',
    accent: '#D43F3AFF',
    userInput: '#3d59a144',
    selected: '#7796CB',
    heading: '#EEF6FC',
    headingHover: '#868bc422',
    paragraph: '#EEF6FC',
    button: '#7796CB',
    buttonText: '#16161E',
    buttonHover: '#3d59a1AA',
  },
  levels: {
    low: 0,
    medium: 1,
    high: 2,
    highest: 3,
  },
}

export const Dark = {
  background: '#1e202e',
  text: '#EEF6FC',
  stroke: '#EEF6FC',
  grid: '#EEF6FC',
}

export const Light = {
  background: '#FFFFFF',
  text: 'black',
  stroke: '#2a2a2a',
  grid: '#2a2a2a',
}

export default theme
