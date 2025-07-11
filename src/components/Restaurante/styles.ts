import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.div`
  background-color: ${cores.fundoCard};
  position: relative;
  border: 1px solid;
  border-color: ${cores.vermelho};
  overflow: hidden;
  text-decoration: none;
  width: 472px;
  height: 398px;
`
export const Image = styled.img`
  width: 100%;
  height: 186px;
  object-fit: cover;
  margin: 0;
  display: block;
`

export const Titulo = styled.h3`
  font-weight: bold;
  font-size: 18px;
  display: block;
  margin-left: 7px;
  margin-top: 8px;
  margin-bottom: 16px;
  color: ${cores.vermelho};
`
export const Descricao = styled.p`
  padding: 8px;
  font-size: 14px;
  line-height: 22px;
  display: block;
  margin-top: 16px;
  color: ${cores.vermelho};
  margin-bottom: 16px;
`
export const TagsContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 8px;
  display: flex;
  gap: 8px;
  z-index: 1;
`
export const NotaEstrela = styled.div`
  position: absolute;
  top: 195px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  p {
    font-size: 18px;
    font-weight: bold;
    color: ${cores.vermelho};
  }

  img {
    width: 20px;
    height: 20px;
  }
`
