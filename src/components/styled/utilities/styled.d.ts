import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
        background: string;
        heading: string;
        paragraph: string;
        cardParagraph: string;
        button: string;
        buttonText: string;
        stroke: string;
        main: string;
        highlight: string;
        secondary: string;
        tertiary: string;
        boxShadow: string;
    },
    levels: {
        low: number;
        medium: number;
        high: number;
        highest: number
    }
  }
}
