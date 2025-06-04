import { createGlobalStyle } from 'styled-components'

export const cores = {
  fundo: '#FFF8F2',
  vermelho: '#E66767',
  letraTag: '#FFEBD9',
  fundoCard: '#FFFFFF'
}

export const GlobalCss = createGlobalStyle`
  * {
  margin: 0;
  padding:0;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  list-style: none;
  }

  body {
    background-color: ${cores.fundo};
    color: ${cores};
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;}
`
