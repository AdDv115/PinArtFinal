import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/Aside.css';
import Login from "./Login";
import Carrito from "./Carrito";
import About from "./About";

// Importar iconos
import homeIcon from '../img/home.png';
import perfilIcon from '../img/user.png';
import CartIcon from '../img/cart.png';
import InfoIcon from '../img/info.png';

const Aside = ({setCartItems, eliminarDelCarrito }) => {
    // Estado para el Login
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Estados para el carrito
    const [showCartModal, setShowCartModal] = useState(false);
    const [cartItems] = useState([]);

    // Estados para el About
    const [showAboutModal, setShowAboutModal] = useState(false);


    const LoginAbierto = () => {
        setShowCartModal(false);
        setShowAboutModal(false);
        setShowModal(true);
    };

    const CarritoAbierto = () => {
        setShowModal(false);
        setShowAboutModal(false);
        setShowCartModal(true);
    };

    const AboutAbierto = () => {
        setShowModal(false);
        setShowCartModal(false);
        setShowAboutModal(true);
    };

    const cerrarTodosModales = () => {
        setShowModal(false);
        setShowCartModal(false);
        setShowAboutModal(false);
    };

    return (
        <aside className="aside">
            <nav className="contenido">
                <Link to="/" className="botonnav" onClick={cerrarTodosModales}>
                    <img src={homeIcon} alt="Inicio" className="icono" />
                </Link>
                
                <div className="botonnav" onClick={() => {
                    console.log('Estado de login al hacer clic:', isLoggedIn);
                    isLoggedIn ? window.location.href = "/perfil" : LoginAbierto();
                }}>           
                    <img src={perfilIcon} alt="Perfil" className="icono" />
                </div> 

                <div className="botonnav" onClick={CarritoAbierto}>
                    <img src={CartIcon} alt="Carrito" className="icono" />
                </div>

                <div className="botonnav" onClick={AboutAbierto}>
                    <img src={InfoIcon} alt="Nosotros" className="icono" />
                </div>
            </nav>

            <Login
                showModal={showModal}
                setShowModal={setShowModal}
                onLoginSuccess={() => setIsLoggedIn(true)}
            />

            <Carrito
                showCartModal={showCartModal}
                setShowCartModal={setShowCartModal}
                carrito={cartItems}
                cartItems={cartItems}
                eliminarDelCarrito={eliminarDelCarrito}
            />

            <About 
                showAboutModal={showAboutModal}
                setShowAboutModal={setShowAboutModal}
            />
        </aside>
    );
};

export default Aside;