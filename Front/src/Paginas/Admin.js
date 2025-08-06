import React from "react";

const Admin = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || usuario.rol !== "admin") {
    return <h2>No tienes permisos para ver esta página</h2>;
  }

  return (
    <div>
      <h1>Panel de administrador</h1>
      <p>Bienvenido, {usuario.nombre}</p>
    </div>
  );
};

export default Admin;
