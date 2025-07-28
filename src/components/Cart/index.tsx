import ButtonCarrinho from '../Button/ButtonPerfil' // Se 'ButtonPerfil' for o botão de continuidade
import ButtonCheckout from '../Button/ButtonCheckout' // Se você tiver um botão específico para o checkout
import lixeira from '../../assets/images/lixeira-de-reciclagem 1.png'

import {
  Overlay,
  CartContainer,
  Sidebar,
  Prices,
  CartItem,
  TotalPriceContainer
} from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
// <--- ALTERADO: Importe goToStep e CheckoutStep
import {
  close,
  remove,
  goToStep,
  CheckoutStep,
  clearCart
} from '../../store/reducers/cart'

// <--- NOVO: Importe os componentes de formulário/estilo do seu Checkout, se eles não estiverem em 'Cart/styles'
// Verifique o caminho correto, pois no código anterior eles estavam em '../../pages/Checkout/styles'
import { ContentForm, InputGroup, InputGroup2 } from './styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'

const Cart = () => {
  // <--- ALTERADO: Agora pegamos 'currentStep' do estado do Redux
  const { isOpen, items, currentStep } = useSelector(
    (state: RootReducer) => state.cart
  )
  const dispatch = useDispatch()

  const [purchase, { isLoading, isError, data }] = usePurchaseMutation()

  const closeCart = () => {
    dispatch(close())
  }

  const getTotalPrice = () => {
    return items.reduce((acumulador, valorAtual) => {
      return (acumulador += valorAtual.preco!)
    }, 0)
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  // <--- NOVAS FUNÇÕES PARA NAVEGAR ENTRE AS ETAPAS
  const handleContinueToDelivery = () => {
    dispatch(goToStep('delivery'))
  }

  const handleContinueToPayment = () => {
    dispatch(goToStep('payment'))
  }

  const handleBackToCart = () => {
    dispatch(goToStep('cart'))
  }

  const handleBackToDelivery = () => {
    dispatch(goToStep('delivery'))
  }

  const handleFinishPayment = () => {
    alert('Pedido finalizado! Obrigado pela compra.') // Mensagem de exemplo
    dispatch(close()) // Fecha a sidebar
    dispatch(clearCart()) // Limpa o carrinho
    dispatch(goToStep('cart')) // Volta para a etapa inicial do carrinho
  }

  const form = useFormik({
    initialValues: {
      fullName: '',
      address: '',
      city: '',
      cep: '',
      number: '',
      complement: '',
      cardDisplayName: '',
      cardNumber: '',
      cardCode: '',
      expiresMonth: '',
      expiresYear: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      address: Yup.string()
        .min(10, 'O endereço precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      city: Yup.string()
        .min(3, 'A cidade precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      cep: Yup.string()
        .min(9, 'O campo precisa ter 10 caracteres')
        .max(9, 'O campo precisa ter 10 caracteres')
        .required('O campo é obrigatório'),
      number: Yup.string()
        .min(1, 'O campo precisa ter pelo menos 1 caractere')
        .required('O campo é obrigatório'),
      complement: Yup.string().optional(),
      cardDisplayName: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      cardNumber: Yup.string()
        .min(16, 'O número do cartão precisa ter 16 caracteres')
        .max(16, 'O número do cartão precisa ter 16 caracteres')
        .required('O campo é obrigatório'),
      cardCode: Yup.string()
        .min(3, 'O CVV precisa ter 3 caracteres')
        .max(3, 'O CVV precisa ter 3 caracteres'),
      expiresMonth: Yup.number()
        .typeError('O mês de vencimento deve ser um número.')
        .min(1, 'O mês de vencimento deve ser entre 1 e 12.')
        .max(12, 'O mês de vencimento deve ser entre 1 e 12.')
        .required('O campo "Mês de vencimento" é obrigatório.'),
      expiresYear: Yup.number()
        .typeError('O ano de vencimento deve ser um número.')
        .min(
          new Date().getFullYear(),
          `O ano de vencimento deve ser ${new Date().getFullYear()} ou superior.`
        )
        .max(
          new Date().getFullYear() + 10,
          `O ano de vencimento não pode ser mais de ${
            new Date().getFullYear() + 10
          } ou superior.`
        ) // Ex: até 10 anos no futuro
        .required('O campo "Ano de vencimento" é obrigatório.')
    }),
    onSubmit: async (values) => {
      alert('onSubmit foi chamado')
      // console.log('Formulário submetido com valores:', values)
      // const productsPayload = items.map((item) => ({
      //   id: item.id,
      //   price: item.preco!
      // }))

      // const payloadToSend = {
      //   delivery: {
      //     receiver: values.fullName,
      //     address: {
      //       description: values.address,
      //       city: values.city,
      //       zipCode: values.cep,
      //       number: values.number,
      //       complement: values.complement
      //     }
      //   },
      //   payment: {
      //     card: {
      //       name: values.cardDisplayName,
      //       number: values.cardNumber,
      //       code: Number(values.cardCode),
      //       expires: {
      //         month: Number(values.expiresMonth),
      //         year: Number(values.expiresYear)
      //       }
      //     }
      //   },
      //   products: productsPayload
      // }

      // console.log('Payload sendo enviado para a API:', payloadToSend)

      // try {
      //   // Isso executa o POST para a API
      //   await purchase(payloadToSend).unwrap()

      //   // Se o POST for bem-sucedido, então finalize o pedido
      //   handleFinishPayment() // Chame esta função aqui
      // } catch (error) {
      //   console.error('Falha ao processar a compra:', error)
      //   alert('Erro ao finalizar o pedido. Por favor, tente novamente.')
      // }
    }
  })

  const getErrorMessage = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isTouched && isInvalid) return message
    return ''
  }

  // <--- NOVAS FUNÇÕES PARA RENDERIZAR O CONTEÚDO DE CADA ETAPA
  const renderCartContent = () => (
    <>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id}>
            <img src={item.foto} alt={item.nome} />
            <div>
              <h3>{item.nome}</h3>
              <h4>
                {item.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </h4>
            </div>
            <img
              className="lixeira"
              src={lixeira}
              alt="lixeira"
              onClick={() => removeItem(item.id)}
            />
          </CartItem>
        ))}
      </ul>
      <TotalPriceContainer>
        <Prices>Valor total</Prices>
        <Prices>
          {getTotalPrice().toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </Prices>
      </TotalPriceContainer>
      <ButtonCarrinho
        className="button"
        type="button"
        title="Clique aqui para continuar com a entrega"
        onClick={handleContinueToDelivery} // <--- Chama a função para mudar de etapa
      >
        Continuar com a entrega
      </ButtonCarrinho>
    </>
  )

  const renderDeliveryForm = () => (
    <form onSubmit={form.handleSubmit}>
      <>
        <ContentForm>
          <h2>Entrega</h2>
          <InputGroup>
            <label htmlFor="fullName">Quem irá receber</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={form.values.fullName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage('fullName', form.errors.fullName)}</small>
          </InputGroup>
          <InputGroup>
            <label htmlFor="address">Endereço</label>
            <input
              id="address"
              type="text"
              name="address"
              value={form.values.address}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage('address', form.errors.address)}</small>
          </InputGroup>
          <InputGroup>
            <label htmlFor="city">Cidade</label>
            <input
              id="city"
              type="text"
              name="city"
              value={form.values.city}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage('city', form.errors.city)}</small>
          </InputGroup>
          <InputGroup2>
            <div>
              <label htmlFor="cep">CEP</label>
              <input
                id="cep"
                type="text"
                name="cep"
                value={form.values.cep}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('cep', form.errors.cep)}</small>
            </div>
            <div>
              <label htmlFor="number">Número</label>
              <input
                id="number"
                type="text"
                name="number"
                value={form.values.number}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('number', form.errors.number)}</small>
            </div>
          </InputGroup2>
          <InputGroup>
            <label htmlFor="complement">Complemento (opcional)</label>
            <input
              id="complement"
              type="text"
              name="complement"
              value={form.values.complement}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </InputGroup>
        </ContentForm>
        <ButtonCheckout
          type="button"
          title="Continuar com o pagamento"
          onClick={async () => {
            console.log('clicado')
          }}
        >
          Continuar com o pagamento
        </ButtonCheckout>
        <ButtonCheckout
          type="button"
          title="Voltar para o carrinho"
          onClick={handleBackToCart}
        >
          Voltar para o carrinho
        </ButtonCheckout>
      </>
    </form>
  )

  const renderPaymentForm = () => (
    <form onSubmit={form.handleSubmit}>
      <>
        <ContentForm className="formCartao">
          {' '}
          {/* Usa a classe para estilos específicos */}
          <h2>Pagamento</h2>
          <InputGroup>
            <label htmlFor="cardDisplayName">Nome no cartão</label>
            <input
              id="cardDisplayName"
              type="text"
              name="cardDisplayName"
              value={form.values.cardDisplayName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>
              {getErrorMessage('cardDisplayName', form.errors.cardDisplayName)}
            </small>
          </InputGroup>
          <InputGroup2>
            <div>
              <label htmlFor="cardNumber">Número do cartão</label>
              <input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={form.values.cardNumber}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage('cardNumber', form.errors.cardNumber)}
              </small>
            </div>
            <div>
              <label htmlFor="cardCode">CVV</label>
              <input
                id="cardCode"
                type="text"
                name="cardCode"
                value={form.values.cardCode}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('cardCode', form.errors.cardCode)}</small>
            </div>
          </InputGroup2>
          <InputGroup2>
            <div>
              <label htmlFor="expiresMonth">Mês de vencimento</label>
              <input
                id="expiresMonth"
                type="text"
                name="expiresMonth"
                value={form.values.expiresMonth}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage('expiresMonth', form.errors.expiresMonth)}
              </small>
            </div>
            <div>
              <label htmlFor="expiresYear">Ano de vencimento</label>
              <input
                id="expiresYear"
                type="text"
                name="expiresYear"
                value={form.values.expiresYear}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage('expiresYear', form.errors.expiresYear)}
              </small>
            </div>
          </InputGroup2>
        </ContentForm>
        <ButtonCheckout type="submit" title="Finalizar pagamento">
          Finalizar pagamento
        </ButtonCheckout>
        <ButtonCheckout
          type="button"
          title="Voltar para a edição de endereço"
          onClick={handleBackToDelivery}
        >
          Voltar para a edição de endereço
        </ButtonCheckout>
      </>
    </form>
  )

  // <--- NOVO: Função para determinar qual conteúdo exibir
  const getContentForStep = (step: CheckoutStep) => {
    switch (step) {
      case 'cart':
        return renderCartContent()
      case 'delivery':
        return renderDeliveryForm()
      case 'payment':
        return renderPaymentForm()
      // case 'confirmation': return renderConfirmation(); // Se tiver mais etapas
      default:
        return renderCartContent() // Fallback
    }
  }

  return (
    // <--- ALTERADO: Removeu o fragmento externo desnecessário
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <Sidebar>
        {/* <--- ALTERADO: Renderiza o conteúdo dinamicamente aqui */}
        {getContentForStep(currentStep)}
      </Sidebar>
    </CartContainer>
  )
}

export default Cart
