import React from 'react';
import { useState } from 'react';
import { data } from './data';
import logo from './logo.png';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart,faBars } from '@fortawesome/free-solid-svg-icons';

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
                            <FontAwesomeIcon icon={faSearch} size='2x' style={{color: 'black'}} />
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
                        <li><a href='/inicio'>Inicio</a></li>
                        <li><a href='/login'>Iniciar Sesión</a></li>
                        <li><a href='#'>Categorías</a></li>
                        <li><a href='#'>Contacto</a></li>
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
        </>
    );
}
