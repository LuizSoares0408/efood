import ButtonCarrinho from "../Button/ButtonPerfil"

import pizza from '../../assets/images/pizza.png'
import lixeira from '../../assets/images/lixeira-de-reciclagem 1.png'

import {Overlay, CartContainer, Sidebar, Prices, CartItem, TotalPriceContainer} from './styles'
import { useDispatch, useSelector } from "react-redux"
import { RootReducer } from "../../store"
import { close, remove } from "../../store/reducers/cart"

const Cart = () => {
    const {isOpen, items} = useSelector((state: RootReducer) => state.cart)

    const dispatch = useDispatch()
    
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

    return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
        <Overlay onClick={closeCart} />
        <Sidebar>
            <ul>
                {items.map((item) => (
                <CartItem key={item.id}>
                    <img src={item.foto} alt={item.nome} />
                    <div>
                        <h3>{item.nome}</h3>
                        <h4>{item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                    </div>
                    <img className="lixeira" src={lixeira} alt="lixeira" onClick={() => removeItem(item.id)} />
                </CartItem>
                ))}
            </ul>
            <TotalPriceContainer>
                <Prices>Valor total</Prices>
                <Prices>{getTotalPrice().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Prices>
            </TotalPriceContainer>
            <ButtonCarrinho className="button" type={"button"} title={"Clique aqui para continuar com a entrega"}>
                Continuar com a entrega
            </ButtonCarrinho>
        </Sidebar>
    </CartContainer>
)
}

export default Cart