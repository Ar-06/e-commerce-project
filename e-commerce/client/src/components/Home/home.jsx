import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { data } from './data';
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faUser, faHeadset, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../Main/jwtUtils';
import './home.css';

export function Home() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [loginVisible, setLoginVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            if (decodedToken) {
                setUsername(decodedToken.user);
                setIsLoggedIn(true);
            }
        }
    }, []);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        if (loginVisible) {
            setLoginVisible(false);
        }
    }

    const toggleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUsername('');
        navigate('/');
    }

    return (
        <>
            <header className="header-tienda">
                <div className="logo-container">
                    <img src={logo} alt="Logo de la Tienda" className="logo-tienda" />
                    <h1 className="title-tienda">E-Tec</h1>
                </div>
                <nav className="nav-tienda">
                    {isLoggedIn ? (
                        <>
                            <span className="welcome-message">Bienvenido(a), {username}!</span>
                            <button className="button-logout" onClick={handleLogout}>  
                                <FontAwesomeIcon icon={faRightFromBracket}  size='2x' style={{color:'black'}} />
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className='button-login'>
                            <FontAwesomeIcon icon={faUser} size='2x' style={{ color: 'black' }} />
                        </Link>
                    )}
                    <button className="button-carrito">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faShoppingCart} size='2x' style={{ color: 'black' }} />
                        </div>
                    </button>
                    <button className="button-menu" onClick={toggleMenu}>
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faBars} size='2x' style={{ color: 'black' }} />
                        </div>
                    </button>
                </nav>
                {menuVisible && (
                    <ul className={`menu-lisa ${menuVisible ? 'active' : ''}`}>
                        <li><a href='/inicio'>Categoria 1</a></li>
                        <li><a href='#'>Categoría 2</a></li>
                        <li><a href='#'>Categoria 3</a></li>
                    </ul>
                )}
            </header>
            <div className="main-container">
                <div className="container-items">
                    {data.map(product => (
                        <div className="card" key={product.id}>
                            <img src={product.img} alt={product.nameProduct} />
                            <div className="info-product">
                                <h3>{product.nameProduct}</h3>
                                <p>S/{product.price}</p>
                                <button className="button-add">Agregar al carrito</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className='btn'>
                <a href='#' className='btn-flotante'><FontAwesomeIcon icon={faHeadset} size='3x' color='white' /></a>
            </button>
            <footer className='footer-tienda'>
                <div className='footer-container'>
                    <div className='footer-column'>
                        <h3>Productos</h3>
                        <ul>
                            <li><a href='/inicio'>Home</a></li>
                            <li><a href='#'>Categorías</a></li>
                        </ul>
                    </div>
                    <div className='footer-column'>
                        <h3>Acceso</h3>
                        <ul>
                            <li><a href='#'>Login</a></li>
                            <li><a href='#'>Registrarse</a></li>
                        </ul>
                    </div>
                    <div className='footer-column'>
                        <h3>Empresa</h3>
                        <ul>
                            <li><a href='#'>Sobre Nosotros</a></li>
                            <li><a href='#'>Contacto</a></li>
                        </ul>
                    </div>
                    <div className='footer-social'>
                        <button>
                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </button>
                    </div>
                </div>
            </footer>
        </>
    );
}
