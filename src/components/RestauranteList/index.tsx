import Food from '../../models/Food'
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
            key={food.id}
            category={food.category}
            description={food.description}
            image={food.image}
            title={food.title}
            destaque={food.destaque}
            nota={food.nota}
          />
        ))}
      </List>
    </div>
  </Container>
)

export default ProductsList
