import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.div`
  background-color: ${cores.vermelho};
  position: relative;
  overflow: hidden;
  display: block;
`
export const Image = styled.img`
  padding: 8px;
  object-fit: cover;
  display: block;
`

export const Titulo = styled.h3`
  font-weight: bold;
  font-size: 16px;
  display: block;
  padding: 8px;
  color: ${cores.letraTag};
`
export const Descricao = styled.p`
  padding: 0 8px;
  font-size: 14px;
  line-height: 22px;
  display: block;
  color: ${cores.letraTag};
  margin-bottom: 16px;
`
