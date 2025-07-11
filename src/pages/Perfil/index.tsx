import { useParams } from 'react-router-dom';
import Apresentacao from '../../components/Apresentação';
import ProdutosList from '../../components/ProdutosList';
import HeaderPerfil from '../../HeaderPerfil';

import { useEffect, useState } from 'react';
import { Food, Cardapio } from '../Home';

const Perfil = () => {
  const { id } = useParams<{ id: string }>(); 

  const [perfil, setPerfil] = useState<Food | null>(null);

  useEffect(() => {
    if (id) { 
      fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Erro na API: ${res.status}`);
          }
          return res.json();
        })
        .then((data: Food) => { 
          setPerfil(data); 
          
        })
        .catch(error => {
          console.error("Erro ao carregar perfil do restaurante:", error);
          
        });
    }
  }, [id]); 

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
