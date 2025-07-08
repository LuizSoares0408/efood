import fundoPerfil from '../../assets/images/fundoPerfil.png'
import { Container, NomeRestaurante, Titulo } from './styles'

const Apresentacao = () => (
  <Container backgroundImage={fundoPerfil}>
    <div className='container'>
    <Titulo>Italiana</Titulo>
    <NomeRestaurante>La Dolce Vita Trattoria</NomeRestaurante>
    </div>
  </Container>
)

export default Apresentacao
