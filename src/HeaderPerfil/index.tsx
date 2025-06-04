import fundo from '../assets/images/fundo.png'
import logo from '../assets/images/logo.png'

import { Container, HeaderContent, Titulo, Logo } from './styles'

const HeaderPerfil = () => (
  <Container backgroundImage={fundo}>
    <HeaderContent>
      <Titulo>Restaurantes</Titulo>
      <Logo src={logo} alt="logo" />
      <Titulo>0 produtos(s) no carrinho</Titulo>
    </HeaderContent>
  </Container>
)

export default HeaderPerfil
