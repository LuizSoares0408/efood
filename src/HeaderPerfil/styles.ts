import styled from 'styled-components'
import { cores } from '../styles'

export const Container = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 186px;
  background-image: url(${(props) => props.backgroundImage});
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1024px;
`

export const Titulo = styled.p`
  font-size: 18px;
  color: ${cores.vermelho};
  font-weight: bold;
  text-align: center;
`
export const CartButton = styled.a`
  font-size: 18px;
  color: ${cores.vermelho};
  font-weight: bold;
  text-align: center;
  display: flex;
  cursor: pointer;
`

export const Logo = styled.img`
  height: 57px;
`
