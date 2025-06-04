import Button from '../Button/ButtonHome/index'
import Tag from '../Tag'
import estrela from '../../assets/images/estrela.png'
import {
  Card,
  Descricao,
  TagsContainer,
  Titulo,
  Image,
  NotaEstrela
} from './styles'

type Props = {
  title: string
  category: string
  description: string
  image: string
  destaque: boolean
  nota: string
}

const Product = ({
  title,
  category,
  description,
  image,
  destaque,
  nota
}: Props) => (
  <Card>
    <Image src={image} alt={title} />
    <TagsContainer>
      {destaque && <Tag>Destaque da semana</Tag>} <Tag>{category}</Tag>
    </TagsContainer>
    <Titulo>{title}</Titulo>
    <NotaEstrela>
      <p>{nota}</p>
      <img src={estrela} alt="Estrela" />
    </NotaEstrela>
    <Descricao>{description}</Descricao>
    <Button type="link" to="/perfil" title="Clique aqui para saber mais">
      Saiba mais
    </Button>
  </Card>
)

export default Product
