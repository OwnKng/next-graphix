import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
        primary: string;
        background: string;
        foreground: string;
        middleground: string;
        border: string;
        accent: string;
        userInput: string;
        selected: string;
        heading: string;
        headingHover: string;
        paragraph: string;
        button: string;
        buttonText: string;
        buttonHover: string;
    },
    levels: {
        low: number;
        medium: number;
        high: number;
        highest: number
    },
  }
}
