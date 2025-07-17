import styled from 'styled-components'
import { cores } from '../../styles'

export const ContainerHeader = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 384px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1024px;
  padding: 0 16px;
  text-align: center;
`
export const Logo = styled.img`
  height: 57px;
  width: auto;
  margin-bottom: 138.5px;
`
export const Titulo = styled.p`
  font-size: 36px;
  color: ${cores.vermelho};
  font-weight: bold;
  text-align: center;
  width: 539px;
  heigth: 84px;
`
