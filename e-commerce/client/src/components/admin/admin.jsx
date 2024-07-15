import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Home/logo.png';
import './admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { parseJwt } from '../Main/jwtUtils';
import { useNavigate } from 'react-router-dom';

export function Admin(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUsername('');
        navigate('/login');
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
            </nav>
        </header>
        <main className='admin-container'>
            <h2>Inserta tus Productos</h2>
        </main>
        
        </>
    )
}