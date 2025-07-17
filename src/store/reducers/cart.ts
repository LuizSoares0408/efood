import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cardapio } from '../../pages/Home' // Certifique-se de que Cardapio está correto

// Define os tipos de etapas do seu fluxo de checkout
export type CheckoutStep = 'cart' | 'delivery' | 'payment' | 'confirmation' // Adicione 'confirmation' se houver tela final

type CartState = {
  items: Cardapio[]
  isOpen: boolean
  currentStep: CheckoutStep // <--- ALTERADO: Agora controlamos a etapa atual
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  currentStep: 'cart' // <--- ALTERADO: Inicia na etapa do carrinho
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Cardapio>) => {
      const produto = state.items.find((item) => item.id === action.payload.id)
      if (!produto) {
        state.items.push(action.payload)
      } else {
        alert('O produto já está no carrinho!') // Considere usar um toast/snackbar em vez de alert
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    open: (state) => {
      state.isOpen = true
      state.currentStep = 'cart' // <--- ALTERADO: Ao abrir, sempre mostra o carrinho primeiro
    },
    close: (state) => {
      state.isOpen = false
      state.currentStep = 'cart' // <--- ALTERADO: Ao fechar, reseta para o carrinho (útil para próxima abertura)
    },
    // <--- NOVO: Ação para mudar a etapa do checkout
    goToStep: (state, action: PayloadAction<CheckoutStep>) => {
      state.currentStep = action.payload
    },
    // <--- OPCIONAL: Ação para limpar o carrinho após finalizar o pedido
    clearCart: (state) => {
      state.items = []
      state.currentStep = 'cart' // Volta para a primeira etapa
      state.isOpen = false // Fecha a sidebar
    }
  }
})

// <--- ALTERADO: Exporte também a nova ação goToStep (e clearCart se adicionou)
export const { add, open, close, remove, goToStep, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
