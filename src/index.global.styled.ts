import { createGlobalStyle } from 'styled-components'

const styled = { createGlobalStyle }

export default styled.createGlobalStyle`
  html,
  body {
    overscroll-behavior: none;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    outline: none;
    padding: 0;
  }

  img,
  svg {
    display: block;
  }
`
