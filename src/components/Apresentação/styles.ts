import styled from 'styled-components'
import { cores } from '../../styles'

export const Container = styled.div`
  width: 100%;
  height: 280px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
`
export const Titulo = styled.p`
  font-size: 32px;
  font-weight: 100;
  line-height: 1;
  letter-spacing: 0;
  color: ${cores.fundoCard};
  text-align: center;
  width: 101px;
  heigth: 33.25px;
  margin-top: 24px;
`

export const NomeRestaurante = styled.p`
  font-size: 32px;
  line-height: 1;
  font-weight: bold;
  color: ${cores.fundoCard};
  width: 676px;
  heigth: 33.25px;
  margin-top: 156.5px;
`