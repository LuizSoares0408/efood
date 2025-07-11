import styled from 'styled-components'
import { cores } from '../../styles'

import { Props } from '.'

export const TagContainer = styled.div<Props>`
  background-color: ${cores.vermelho};
  color: ${cores.letraTag};
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
  padding: 6px 4px;
`
