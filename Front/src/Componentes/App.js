import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Aside from './Aside';
import Perfil from '../Paginas/ContPerfil';
import Admin from '../Paginas/Admin';
import Inicio from '../Paginas/Inicio';
import Pago from '../Componentes/pago'

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (obra) => {
    const existe = cartItems.find(item => item.name === obra.name);
    if (existe) {
      const actualizado = cartItems.map(item =>
        item.name === obra.name
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCartItems(actualizado);
    } else {
      setCartItems([...cartItems, { ...obra, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (index) => {
    const nuevosItems = [...cartItems];
    nuevosItems.splice(index, 1);
    setCartItems(nuevosItems);
  };


  return (
    <BrowserRouter>
      <Aside
        cartItems={cartItems}
        setCartItems={setCartItems}
        eliminarDelCarrito={eliminarDelCarrito}
      />

      <Routes>
      <Route path="/" element={<Inicio addToCart={addToCart} />} />       
        <Route path="/perfil" element={<Perfil addToCart={addToCart} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pago" element={<Pago />} />
      </Routes>
      
    </BrowserRouter>
  );
}
