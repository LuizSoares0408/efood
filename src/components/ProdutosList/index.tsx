import Products from '../../models/Products'
import Produtos from '../Produtos'
import { Container, List } from './styles'

export type Props = {
  produtos: Products[]
}

const ProdutosList = ({ produtos }: Props) => (
  <Container produtos={produtos}>
    <div className="container">
      <List>
        {produtos.map((product) => (
          <Produtos
            key={product.id}
            description={product.description}
            image={product.image}
            title={product.title}
          />
        ))}
      </List>
    </div>
  </Container>
)

export default ProdutosList
