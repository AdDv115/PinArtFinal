import React, { useState } from "react";
import axios from 'axios'; // Asegúrate de tener instalado Axios
import '../css/Login.css';
import { useNavigate } from "react-router-dom";

const Login = ({ showModal, setShowModal }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        nombre: '',
        correo: '',
        contrasena: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = isLogin
            ? 'http://localhost:5000/api/login'
            : 'http://localhost:5000/api/register';

        const { data } = await axios.post(url, form);

        alert(data.message);

        if (isLogin) {
            localStorage.setItem("usuario", JSON.stringify(data.user)); 
            const rol = data.user.rol;

            if (rol === "admin") {
                navigate("/admin");
            } else {
                navigate("/perfil");
            }
        }

        setShowModal(false);
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Ocurrió un error en el servidor.";
        alert(errorMsg);
    }
};

    

    return (
        <div className={`login ${showModal ? "abierto" : ""}`}>
            <div className="loginContent">
                <button className="cerrar" onClick={() => setShowModal(false)}>X</button>

                <h3>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h3>

                <form onSubmit={handleAuthSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre completo"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo electrónico"
                        value={form.correo}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="contrasena"
                        placeholder="Contraseña"
                        value={form.contrasena}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="btnLR">
                        {isLogin ? "Ingresar" : "Registrarse"}
                    </button>
                </form>

                <p className="inicio-registro">
                    {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Regístrate" : "Inicia sesión"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
