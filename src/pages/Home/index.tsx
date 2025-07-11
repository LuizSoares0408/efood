import Header from '../../components/Header'

import ProductsList from '../../components/RestauranteList'
import { useEffect, useState } from 'react'

export type Food = {
  id: number,
  titulo: string,
  destacado: boolean,
  tipo: string,
  avaliacao: string,
  descricao: string,
  capa: string,
  cardapio: Cardapio[];
}

export type Cardapio = {
  foto: string,
  preco: number,
  id: number,
  nome: string,
  descricao: string,
  porcao: string
}


const Home = () => {
  const[restaurantes, setRestaurantes] = useState<Food[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes').then(res => res.json())
    .then(res => setRestaurantes(res))
  }, [])

  return (
  <>
    <Header />
    <ProductsList foods={restaurantes} />
  </>
)
}

export default Home
