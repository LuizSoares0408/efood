import ButtonCarrinho from '../Button/ButtonPerfil'
import fechar from '../../assets/images/fechar.png'
import {
  Card,
  Descricao,
  Titulo,
  Image,
  Modal,
  ModalContent,
  ButtonModal
} from './styles'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add, open } from '../../store/reducers/cart'
import { Cardapio } from '../../pages/Home'

type Props = {
  cardapio: Cardapio
}

const Produtos = ({ cardapio }: Props) => {
  const [modalEstaAberto, setModalEstaAberto] = useState(false)

  const getDescricao = (descricao: string) => {
    if (descricao.length > 95) {
      return descricao.slice(0, 130) + '...'
    }
    return descricao
  }

  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(add(cardapio))
    dispatch(open())
  }

  return (
    <>
      <Card>
        <Image src={cardapio.foto} />
        <Titulo>{cardapio.nome}</Titulo>
        <Descricao>{getDescricao(cardapio.descricao)}</Descricao>
        <ButtonCarrinho
          type="link"
          to=""
          title="Clique aqui para adicionar ao carrinho"
          onClick={() => {
            setModalEstaAberto(true)
          }}
        >
          Adicionar ao carrinho
        </ButtonCarrinho>
      </Card>
      <Modal className={modalEstaAberto ? 'visivel' : ''}>
        <ModalContent className="container">
          <img src={cardapio.foto} alt="Foto do prato" />
          <div>
            <h4>{cardapio.nome}</h4>
            <img
              className="fechar"
              src={fechar}
              alt="Ícone de fechar"
              onClick={() => setModalEstaAberto(false)}
            />
            <p>{cardapio.descricao}</p> <br />
            <p>Serve: {cardapio.porcao}</p>
            <ButtonModal
              onClick={addToCart}
              to={''}
              type="link"
              title="Clique aqui para adicionar ao carrinho"
            >
              Adicionar ao carrinho -{' '}
              <span>
                {cardapio.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>
            </ButtonModal>
          </div>
        </ModalContent>
        <div
          className="overlay"
          onClick={() => setModalEstaAberto(false)}
        ></div>
      </Modal>
    </>
  )
}

export default Produtos
