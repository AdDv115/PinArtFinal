import React from "react";
import "../css/Obras.css";

const imagenes = [
  { id: 1, src: "Broken.jpg", name: "Broken", price: 50 },
  { id: 2, src: "Chaqueta.jpg", name: "Chaqueta", price: 75 },
  { id: 3, src: "Collar.jpg", name: "Collar", price: 40 },
  { id: 4, src: "Adan.jpg", name: "Adán", price: 60 },
  { id: 5, src: "Exorcismo.jpg", name: "Exorcismo", price: 90 },
  { id: 6, src: "Hurt.jpg", name: "Hurt", price: 55 },
  { id: 7, src: "Libro.jpg", name: "Libro", price: 35 },
  { id: 8, src: "Lovecraft.jpg", name: "Lovecraft", price: 65 },
  { id: 9, src: "Pain.jpg", name: "Pain", price: 70 },
];

const Obras = ({ addToCart = null, mostrarBoton = true, filtro = "" }) => {
  const obrasFiltradas = imagenes.filter((obra) =>
  obra.name.toLowerCase().includes(filtro.toLowerCase())
); 

return (

    <div className="principal-contenido">
        <div className="galeria-grid">
            {obrasFiltradas.length > 0 ? (
              obrasFiltradas.map((obra) => (
                <div className="galeria-item" key={obra.id}>
                  <img src={obra.src} alt={obra.name} />
                  <p><strong>{obra.name}</strong></p>
                  <p>${obra.price}</p>
                  {mostrarBoton && addToCart && (
                  console.log(),
                  <button className="AgC" onClick={() => addToCart({ ...obra, cantidad: 1 })}> 
                  Agregar al Carrito
                  </button>
                )}
                  </div>
              ))
                ) 
      : 
      (
        <p className="mensaje-no-encontrado">No se encontraron obras.</p>
      )}
        </div>
    </div>

    )
};

export default Obras;
