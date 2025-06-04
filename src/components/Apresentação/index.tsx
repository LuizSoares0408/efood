import apresentacao from '../../assets/images/apresentacao.png'
import { Container, Imagemapresentacao } from './styles'

const Apresentacao = () => (
  <Container>
    <Imagemapresentacao src={apresentacao} alt="Apresentação do restaurante" />
  </Container>
)

export default Apresentacao
