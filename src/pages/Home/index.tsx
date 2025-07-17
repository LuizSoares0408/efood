import Header from '../../components/Header'

import ProductsList from '../../components/RestauranteList'
import { useEffect, useState } from 'react'

import { useGetFeaturedFoodQuery } from '../../services/api'

export type Food = {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: string
  descricao: string
  capa: string
  cardapio: Cardapio[]
}

export type Cardapio = {
  foto: string
  preco: number
  id: number
  nome: string
  descricao: string
  porcao: string
}

const Home = () => {
  const { data: restaurantes } = useGetFeaturedFoodQuery()

  if (restaurantes) {
    return (
      <>
        <Header />
        <ProductsList foods={restaurantes} />
      </>
    )
  }

  return <h4>Carregando...</h4>
}

export default Home
