import React from "react";
import "../css/Header.css";

const categorias = ["Todos","Pinturas", "Manualidades", "Literatura", "Confección"];

const Header = ({ onFiltrar }) => {
  return (
    <div className="header-container">
      {categorias.map(cat => (
        <button
          key={cat}
          className="headerbtn"
          onClick={() => onFiltrar(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Header;