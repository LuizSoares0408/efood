import fundo from '../assets/images/fundo.png'
import logo from '../assets/images/logo.png'

import { Container, HeaderContent, Titulo, Logo, CartButton } from './styles'

import { open } from '../store/reducers/cart'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../store'

const HeaderPerfil = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <Container backgroundImage={fundo}>
      <HeaderContent>
        <Titulo>Restaurantes</Titulo>
        <Logo src={logo} alt="logo" />
        <CartButton onClick={openCart}>
          {items.length} produtos(s) no carrinho
        </CartButton>
      </HeaderContent>
    </Container>
  )
}

export default HeaderPerfil
