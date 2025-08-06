import React from 'react';
import Obras from '../Componentes/Obras';

export default function Inicio({ addToCart }) {
  return (   
        <Obras addToCart={addToCart}/>
  );
}

