import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { cores } from '../../../styles'

export const ButtonLink = styled(Link)`
  color: ${cores.vermelho};
  background-color: ${cores.letraTag};
  font-size: 14px;
  font-weight: bold;
  padding: 4px 8px;
  margin: 0 0 12px;
  text-decoration: none;
  display: block;
  text-align: center;
`
export const ButtonElement = styled.button`
  color: ${cores.vermelho};
  background-color: ${cores.letraTag};
  font-size: 14px;
  font-weight: bold;
  padding: 4px 8px;
  margin: 0 0 12px;
  text-decoration: none;
  display: block;
  text-align: center;
  border: none;
  width: 100%;
  cursor: pointer;
`
