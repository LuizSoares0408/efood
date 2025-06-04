import ButtonCarrinho from '../Button/ButtonPerfil'
import { Card, Descricao, Titulo, Image } from './styles'

type Props = {
  title: string
  description: string
  image: string
}

const Produtos = ({ title, description, image }: Props) => (
  <Card>
    <Image src={image} alt={title} />
    <Titulo>{title}</Titulo>
    <Descricao>{description}</Descricao>
    <ButtonCarrinho
      type="link"
      to=""
      title="Clique aqui para adicionar ao carrinho"
    >
      Adcionar ao carrinho
    </ButtonCarrinho>
  </Card>
)

export default Produtos
