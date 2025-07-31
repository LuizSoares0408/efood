import ButtonCarrinho from '../Button/ButtonPerfil'
import ButtonCheckout from '../Button/ButtonCheckout'
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
import {
  close,
  remove,
  goToStep,
  CheckoutStep,
  clearCart
} from '../../store/reducers/cart'

import { ContentForm, InputGroup, InputGroup2 } from './styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'
import { useEffect, useState } from 'react'

const Cart = () => {
  const { isOpen, items, currentStep } = useSelector(
    (state: RootReducer) => state.cart
  )
  const dispatch = useDispatch()

  const [purchase, { isLoading, isError, data }] = usePurchaseMutation()

  const [orderId, setOrderId] = useState<string | null>(null)

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

  const handleBackToCart = () => {
    dispatch(goToStep('cart'))
  }

  const handleBackToDelivery = () => {
    dispatch(goToStep('delivery'))
  }

  const handleFinishPayment = () => {
    dispatch(goToStep('confirmation'))
  }

  // Define o schema de validação DENTRO do componente
  // para que ele possa acessar diretamente a variável `currentStep`.
  // Isso elimina a necessidade de passar o contexto via `useFormik` ou `$currentStep`.
  const validationSchema = Yup.object().shape({
    // Os campos de Delivery agora dependem diretamente do `currentStep`
    fullName: Yup.string()
      .min(5, 'O nome precisa ter pelo menos 5 caracteres')
      .when([], {
        // Remova a referência '$currentStep' aqui
        is: () => currentStep === 'delivery' || currentStep === 'payment',
        then: (schema) => schema.required('O campo é obrigatório')
      }),
    address: Yup.string()
      .min(10, 'O endereço precisa ter pelo menos 5 caracteres')
      .when([], {
        // Remova a referência '$currentStep' aqui
        is: () => currentStep === 'delivery' || currentStep === 'payment',
        then: (schema) => schema.required('O campo é obrigatório')
      }),
    city: Yup.string()
      .min(3, 'A cidade precisa ter pelo menos 5 caracteres')
      .when([], {
        // Remova a referência '$currentStep' aqui
        is: () => currentStep === 'delivery' || currentStep === 'payment',
        then: (schema) => schema.required('O campo é obrigatório')
      }),
    cep: Yup.string()
      .min(9, 'O campo precisa ter 9 caracteres')
      .max(9, 'O campo precisa ter 9 caracteres')
      .when([], {
        // Remova a referência '$currentStep' aqui
        is: () => currentStep === 'delivery' || currentStep === 'payment',
        then: (schema) => schema.required('O campo é obrigatório')
      }),
    number: Yup.string()
      .min(1, 'O campo precisa ter pelo menos 1 caractere')
      .when([], {
        // Remova a referência '$currentStep' aqui
        is: () => currentStep === 'delivery' || currentStep === 'payment',
        then: (schema) => schema.required('O campo é obrigatório')
      }),
    complement: Yup.string().optional(),

    // Campos de Pagamento - Válidos apenas na etapa 'payment'
    cardDisplayName: Yup.string()
      .min(5, 'O nome precisa ter pelo menos 5 caracteres')
      .when([], {
        // Remova a referência '$currentStep' aqui
        is: () => currentStep === 'payment',
        then: (schema) => schema.required('O campo é obrigatório')
      }),
    cardNumber: Yup.string()
      .min(16, 'O número do cartão precisa ter 16 caracteres')
      .max(16, 'O número do cartão precisa ter 16 caracteres')
      .when([], {
        // Remova a referência '$currentStep' aqui
        is: () => currentStep === 'payment',
        then: (schema) => schema.required('O campo é obrigatório')
      }),
    cardCode: Yup.string()
      .min(3, 'O CVV precisa ter 3 caracteres')
      .max(3, 'O CVV precisa ter 3 caracteres')
      .when([], {
        // Remova a referência '$currentStep' aqui
        is: () => currentStep === 'payment',
        then: (schema) => schema.required('O campo é obrigatório')
      }),
    expiresMonth: Yup.number()
      .typeError('O mês de vencimento deve ser um número.')
      .min(1, 'O mês de vencimento deve ser entre 1 e 12.')
      .max(12, 'O mês de vencimento deve ser entre 1 e 12.')
      .when([], {
        // Remova a referência '$currentStep' aqui
        is: () => currentStep === 'payment',
        then: (schema) =>
          schema.required('O campo "Mês de vencimento" é obrigatório.')
      }),
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
      )
      .when([], {
        // Remova a referência '$currentStep' aqui
        is: () => currentStep === 'payment',
        then: (schema) =>
          schema.required('O campo "Ano de vencimento" é obrigatório.')
      })
  })

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
    validationSchema: validationSchema, // Use o schema definido acima
    enableReinitialize: true, // Garante que o Formik reavalie o schema quando as dependências mudam
    onSubmit: async (values) => {
      if (currentStep === 'delivery') {
        dispatch(goToStep('payment'))
      } else if (currentStep === 'payment') {
        console.log('Formulário de pagamento submetido com valores:', values)
        const productsPayload = items.map((item) => ({
          id: item.id,
          price: item.preco!
        }))

        const payloadToSend = {
          delivery: {
            receiver: values.fullName,
            address: {
              description: values.address,
              city: values.city,
              zipCode: values.cep,
              number: values.number,
              complement: values.complement
            }
          },
          payment: {
            card: {
              name: values.cardDisplayName,
              number: values.cardNumber,
              code: Number(values.cardCode),
              expires: {
                month: Number(values.expiresMonth),
                year: Number(values.expiresYear)
              }
            }
          },
          products: productsPayload
        }

        console.log('Payload sendo enviado para a API:', payloadToSend)

        try {
          const result = await purchase(payloadToSend).unwrap()
          console.log('Resultado completo da compra (após unwrap):', result)
          console.log('Valor de result.orderId:', result?.orderId)
          console.log('Tipo de result.orderId:', typeof result?.orderId)
          console.log(
            'Condição (result && result.orderId) é:',
            !!(result && result.orderId)
          )
          if (result && result.orderId) {
            console.log('Entrou no IF: Preparando para ir para a confirmação!')
            setOrderId(result.orderId)
            dispatch(clearCart())
            handleFinishPayment()
          } else {
            console.log(
              'Não entrou no IF. result ou result.orderId é falso ou nulo.'
            )
          }
        } catch (error) {
          console.error('Falha ao processar a compra:', error)
          alert('Erro ao finalizar o pedido. Por favor, tente novamente.')
        }
      }
    }
  })

  // Novo useEffect: sempre que currentStep mudar, revalidar o formulário.
  // Isso garante que o Yup.when() tenha o contexto correto.
  useEffect(() => {
    // Basta revalidar os campos, o schema já acessa `currentStep` diretamente.
    form.validateForm(form.values)
    console.log('Erros do Formik (após mudança de etapa):', form.errors)
  }, [currentStep, form.validateForm])

  // useEffect existente para depuração dos erros do Formik
  useEffect(() => {
    console.log('Erros do Formik (durante interação):', form.errors)
  }, [form.errors])

  const getErrorMessage = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isTouched && isInvalid) return message
    return ''
  }

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
        onClick={() => dispatch(goToStep('delivery'))}
      >
        Continuar com a entrega
      </ButtonCarrinho>
    </>
  )

  const renderDeliveryForm = () => (
    <form onSubmit={form.handleSubmit} noValidate>
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
      <ButtonCheckout type="submit" title="Continuar com o pagamento">
        Continuar com o pagamento
      </ButtonCheckout>
      <ButtonCheckout
        type="button"
        title="Voltar para o carrinho"
        onClick={handleBackToCart}
      >
        Voltar para o carrinho
      </ButtonCheckout>
    </form>
  )

  const renderPaymentForm = () => (
    <form onSubmit={form.handleSubmit} noValidate>
      <ContentForm className="formCartao">
        <h2>
          Pagamento - Valor a pagar{' '}
          {getTotalPrice().toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </h2>
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
    </form>
  )

  const renderHandleFinishPayment = () => {
    return (
      <ContentForm>
        <h2>Pedido realizado - {orderId || 'Não disponível'}</h2>
        <p>
          Estamos felizes em informar que seu pedido já está em processo de
          preparação e, em breve, será entregue no endereço fornecido. <br />{' '}
          <br />
          Gostaríamos de ressaltar que nossos entregadores não estão autorizados
          a realizar cobranças extras. <br /> <br />
          Lembre-se da importância de higienizar as mãos após o recebimento do
          pedido, garantindo assim sua segurança e bem-estar durante a refeição.{' '}
          <br /> <br />
          Esperamos que desfrute de uma deliciosa e agradável experiência
          gastronômica. Bom apetite!
        </p>
        <ButtonCheckout
          title={'Concluir'}
          onClick={() => {
            dispatch(close())
          }}
        >
          Concluir
        </ButtonCheckout>
      </ContentForm>
    )
  }

  const getContentForStep = (step: CheckoutStep) => {
    switch (step) {
      case 'cart':
        return renderCartContent()
      case 'delivery':
        return renderDeliveryForm()
      case 'payment':
        return renderPaymentForm()
      case 'confirmation':
        return renderHandleFinishPayment()
      default:
        return renderCartContent()
    }
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <Sidebar>{getContentForStep(currentStep)}</Sidebar>
    </CartContainer>
  )
}

export default Cart
