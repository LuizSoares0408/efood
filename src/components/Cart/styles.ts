import styled from 'styled-components'
import { cores } from '../../styles'

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
`

export const CartContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    justify-content: flex-end;
    z-index: 1;

    &.is-open {
        display: flex;
    }
`
export const Sidebar = styled.aside`
    background-color: ${cores.vermelho};
    z-index: 1;
    padding: 32px 8px 0px 8px;
    max-width: 360px;
    width: 100%;

    .button {
        margin: 0;
        background-color: ${cores.letraTag}
    }
`
export const TotalPriceContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 16px;
    `
    
export const Prices = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: ${cores.letraTag};
`
export const CartItem = styled.li`
    width: 344px;
    height: 100px;
    display: flex;
    background-color: ${cores.letraTag};
    margin-bottom: 16px;
    position: relative;
    

    img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        margin: 8px 8px 12px 8px;
    }

    .lixeira {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 0;
        bottom: 0;
        margin-bottom: 8px;
        cursor: pointer;
    }

    h3 {
        font-size: 18px;
        font-weight: bold;
        color: ${cores.vermelho};
        margin-top: 8px;
    }

    h4 {
        font-size: 14px;
        color: ${cores.vermelho};
        margin-top: 16px;
        font-weight: 400;
        
    }
`
