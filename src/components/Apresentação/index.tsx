import { Container, NomeRestaurante, Titulo } from './styles'
import { Food } from '../../pages/Home'

type Props = {
  foods: Food
}

const Apresentacao = ({ foods }: Props) => {
  return (
    <Container style={{ backgroundImage: `url(${foods.capa})` }}>
      <div className="container">
        <Titulo>{foods.tipo}</Titulo>
        <NomeRestaurante>{foods.titulo}</NomeRestaurante>
      </div>
    </Container>
  )
}

export default Apresentacao
