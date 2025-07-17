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
  id: number
}

const Product = ({
  title,
  category,
  description,
  image,
  destaque,
  nota,
  id
}: Props) => {
  const getDescricao = (descricao: string) => {
    if (descricao.length > 95) {
      return descricao.slice(0, 240) + '...'
    }
    return descricao
  }

  return (
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
      <Descricao>{getDescricao(description)}</Descricao>
      <Button
        type="link"
        to={`/perfil/${id}`}
        title="Clique aqui para saber mais"
      >
        Saiba mais
      </Button>
    </Card>
  )
}

export default Product
