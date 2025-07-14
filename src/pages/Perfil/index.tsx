import { useParams } from 'react-router-dom';
import Apresentacao from '../../components/Apresentação';
import ProdutosList from '../../components/ProdutosList';
import HeaderPerfil from '../../HeaderPerfil';

import { useEffect, useState } from 'react';
import { Food } from '../Home';
import { useGetPerfilQuery } from '../../services/api';

const Perfil = () => {
  const { id } = useParams<{ id: string }>(); 
  const {data: perfil} = useGetPerfilQuery(id!)

  if (!perfil) {
    return <h3>Carregando...</h3>;
  }

  return (
    <>
      <HeaderPerfil />
      <Apresentacao foods={perfil} />
      <ProdutosList produtos={perfil.cardapio || []} />
    </>
  );
};

export default Perfil;
