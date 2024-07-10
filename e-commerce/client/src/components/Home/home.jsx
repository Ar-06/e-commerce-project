import React from 'react';
import { useState } from 'react';
import { data } from './data';
import logo from './logo.png';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faBars, faUser, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faFacebook,faInstagram } from '@fortawesome/free-brands-svg-icons';

export function Home() {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    }

    return (
        <>
            <header className="header-tienda">
                <div className="logo-container">
                    <img src={logo} alt="Logo de la Tienda" className="logo-tienda" />
                    <h1 className="title-tienda">E-Tec</h1>
                </div>
                <nav className="nav-tienda">
                    <button className="button-search">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faUser} size='2x' style={{color: 'black'}} />
                        </div>
                    </button>
                    <button className="button-carrito">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faShoppingCart} size='2x' style={{color: 'black'}} />
                        </div>
                    </button>
                    <button className="button-menu" onClick={toggleMenu}>
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faBars} size='2x' style={{color: 'black'}} />
                        </div>
                    </button>
                </nav>
                {menuVisible && (
                    <ul className='menu-lisa'>
                        <li><a href='/inicio'>Categoria1</a></li>
                        <li><a href='#'>Categoría2</a></li>
                        <li><a href='#'>Categoria3</a></li>
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
                <a href='#' className='btn-flotante'><FontAwesomeIcon icon={faHeadset} size='3x' color='black'/></a>
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
