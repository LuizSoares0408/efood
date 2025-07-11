import ButtonCarrinho from '../Button/ButtonPerfil'
import fechar from '../../assets/images/fechar.png'
import { Card, Descricao, Titulo, Image, Modal, ModalContent, ButtonModal } from './styles'
import { useState } from 'react'

type Props = {
  title: string
  description: string
  image: string
  descricao: string,
  porcao: string
  preco: number
}

const Produtos = ({  title,
  description,
  image,
  descricao,
  porcao,
  preco
}: Props) => {

  const [modalEstaAberto, setModalEstaAberto] = useState(false);
  
  const getDescricao = (descricao: string) => {
    if (descricao.length > 95) {
      return descricao.slice(0, 130) + '...'
    }
    return descricao
  }

  return (
  <>
  <Card>
    <Image src={image} />
    <Titulo>{title}</Titulo>
    <Descricao>{getDescricao(description)}</Descricao>
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
    <ModalContent className='container'>
      <img src={image} alt='Foto da pizza' />
      <div>
      <h4>{title}</h4>
      <img className='fechar' src={fechar} alt='Ícone de fechar' onClick={() => setModalEstaAberto(false)} />
      <p>{descricao}</p> <br />
      <p>Serve: {porcao}</p>
    <ButtonModal to={''} type='link' title='Clique aqui para adicionar ao carrinho'>Adicionar ao carrinho - <span>R${preco}</span></ButtonModal>
      </div>
    </ModalContent>
    <div className='overlay' onClick={() => setModalEstaAberto(false)}></div>
  </Modal>
  </>
  )
}

export default Produtos
