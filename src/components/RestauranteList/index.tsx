import { Food } from '../../pages/Home'
import Product from '../Restaurante'
import { Container, List } from './styles'

export type Props = {
  foods: Food[]
}

const ProductsList = ({ foods }: Props) => (
  <Container foods={foods}>
    <div className="container">
      <List>
        {foods.map((food) => (
          <Product
            id={food.id}
            key={food.id}
            category={food.tipo}
            description={food.descricao}
            image={food.capa}
            title={food.titulo}
            destaque={food.destacado}
            nota={food.avaliacao}
          />
        ))}
      </List>
    </div>
  </Container>
)

export default ProductsList
