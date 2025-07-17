import styled from 'styled-components'
import { cores } from '../../styles'
import { Link } from 'react-router-dom'

export const Card = styled.div`
  width: 320px;
  height: 338px;
  background-color: ${cores.vermelho};
  position: relative;
  overflow: hidden;
  display: block;
`
export const Image = styled.img`
  width: 304px;
  height: 167px;
  object-fit: cover;
  display: block;
  margin: 8px;
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
export const Modal = styled.div`
  width: 1024px;
  height: 344px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;

  &.visivel {
    display: flex;
  }

  .fechar {
    position: absolute;
    margin: 0;
    top: 8px;
    right: 8px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }
`
export const ModalContent = styled.div`
  position: relative;
  z-index: 1;
  background-color: ${cores.vermelho};

  display: flex;

  > div {
    display: block;
  }

  img {
    width: 280px;
    height: 280px;
    display: flex;
    object-fit: cover;
    margin: 32px 24px 32px 32px;
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
    color: ${cores.branca};
    margin-top: 32px;
  }

  p {
    font-size: 14px;
    color: ${cores.branca};
    margin-top: 16px;
    line-height: 22px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
  }
`
export const ButtonModal = styled(Link)`
  width: 218px;
  height: 24px;
  padding: 4px 7px;
  color: ${cores.vermelho};
  background-color: ${cores.fundo};
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 59px;
`
