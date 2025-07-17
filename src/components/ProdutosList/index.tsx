import { Cardapio } from '../../pages/Home'
import Produtos from '../Produtos'
import { Container, List } from './styles'

type Props = {
  produtos: Cardapio[]
}

const ProdutosList = ({ produtos }: Props) => {
  return (
    <Container>
      <div className="container">
        <List>
          {produtos.map((item: Cardapio) => (
            <Produtos key={item.id} cardapio={item} />
          ))}
        </List>
      </div>
    </Container>
  )
}

export default ProdutosList
