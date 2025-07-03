import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { cores } from '../../../styles'

export const ButtonLink = styled(Link)`
  color: ${cores.letraTag};
  background-color: ${cores.vermelho};
  font-size: 14px;
  font-weight: bold;
  padding: 4px 6px;
  margin: 0 8px 16px 8px;
  text-decoration: none;
  display: block;
  width: fit-content;
`
