import React from "react";
import "../css/carrito.css";
import { useNavigate } from "react-router-dom";


const Carrito = ({ showCartModal, setShowCartModal, cartItems = [], eliminarDelCarrito }) => {
  const navigate = useNavigate();
  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.cantidad, 0);
  };

  const cerrarCarrito = () => {
    setShowCartModal(false);
  };
  const onPagar = () => {
    navigate("/pago");
  };

  if (!showCartModal) return null;

  return (
        <div className={`carrito ${showCartModal ? "abierto" : ""}`}>      
        <div className="carritocontent">
        <button className="cerrar" onClick={cerrarCarrito} style={{ float: "right" }}>X</button>
        <h2>🛒 Tu Carrito</h2>
  
        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>{item.name}</strong><br />
                Cantidad: {item.cantidad}<br />
                Precio total: ${item.price * item.cantidad}<br />
                {eliminarDelCarrito && (
                  <button onClick={() => eliminarDelCarrito(index)} style={{ marginTop: "5px" }}>
                    Eliminar
                  </button>
                )}
                <hr />
              </li>
            ))}
          </ul>
        )}
  
        {cartItems.length > 0 && (
          <h4>Total a pagar: ${calcularTotal()}</h4>
        )}
        <button className="btn-comprar" onClick={onPagar}>
              Pagar
        </button>
      </div>
    </div>
  );
  
};

export default Carrito;
