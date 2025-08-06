import Obras from '../Componentes/Obras';
import '../css/perfil.css';
import editar from '../img/edit.png';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

const ContPerfil = ({ addToCart}) => {
    const initialUser = JSON.parse(localStorage.getItem("usuario")) || {};
    const [usuario, setUsuario] = useState(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: initialUser.id || '',
        nombre: initialUser.nombre || '',
        biografia: initialUser.biografia || '',
        avatar: initialUser.avatar || '',
    });

    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState('');
  
    useEffect(() => {
        setFormData({
            id: usuario.id || '',
            nombre: usuario.nombre || '',
            biografia: usuario.biografia || '',
            avatar: usuario.avatar || '',
        });
    }, [usuario]);
  
    const cerrarSesion = () => {
        localStorage.removeItem("usuario");
        navigate("/"); 
    };
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const guardarCambios = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/actualizar', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el perfil');
            }

            const updatedUser = { ...usuario, ...formData };
            setUsuario(updatedUser);
            localStorage.setItem("usuario", JSON.stringify(updatedUser));
            setIsEditing(false);
            alert('Perfil actualizado con éxito');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };
    
    return (   
        <div className="todo">
            <div className="Perfil-container">
                <div className="perfil">
                    <h1 className="avatar">{usuario.nombre || 'Nombre'}</h1>
                    <img
                        src={usuario.avatar || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_960_720.png'}
                        alt="Perfil"
                        className="avatar-img"
                    />
                </div> 
                <p className="perfil-descripcion">
                    {usuario.biografia || 'Artista apasionado por la pintura...'}
                </p>
                <img 
                    src={editar} 
                    alt="editar" 
                    className="iconoEdit" 
                    onClick={() => setIsEditing(true)}
                />
            </div>

            {isEditing && (
                <div className="modal-editar-perfil">
                    <div className="modal-contenido">
                        <h2>Editar Perfil</h2>
                        <label>
                            Nombre:
                            <input 
                                type="text" 
                                name="nombre"
                                value={formData.nombre} 
                                onChange={handleChange} 
                            />
                        </label>
                        <label>
                            Biografía:
                            <textarea 
                                name="biografia"
                                value={formData.biografia} 
                                onChange={handleChange} 
                            />
                        </label>
                        <label>
                            URL del Avatar:
                            <input 
                                type="text" 
                                name="avatar"
                                value={formData.avatar} 
                                onChange={handleChange} 
                            />
                        </label>
                        <div className="modal-botones">
                            <button onClick={guardarCambios}>Guardar</button>
                            <button onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            

            <div className="galeria-container">
              <div className="barra-busqueda-container">
                <input
                    type="text"
                    placeholder="Buscar obra..."
                    className="barra-busqueda"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
                <Obras addToCart={addToCart} mostrarBoton={true} filtro={busqueda} />
            </div>  

            <button onClick={cerrarSesion} className="btn-cerrar-sesion">
                Cerrar Sesión
            </button>
        </div>
    );  
}

export default ContPerfil;