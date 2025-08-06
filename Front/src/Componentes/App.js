import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Aside from './Aside';
import Perfil from '../Paginas/ContPerfil';
import Admin from '../Paginas/Admin';
import Carrito from './Carrito';
import Inicio from '../Paginas/Inicio';
import Pago from '../Componentes/pago'

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const addToCart = (obra) => {
    setCartItems(prev => [...prev, obra]);
    setShowCartModal(true);
  };

  return (
    <BrowserRouter>
      <Aside />
      <Routes>
      <Route path="/" element={<Inicio addToCart={addToCart} />} />       
        <Route path="/perfil" element={<Perfil addToCart={addToCart} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pago" element={<Pago />} />
      </Routes>
      <Carrito
        showCartModal={showCartModal}
        setShowCartModal={setShowCartModal}
        cartItems={cartItems}
      />
    </BrowserRouter>
  );
}
