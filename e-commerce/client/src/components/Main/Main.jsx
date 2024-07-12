import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from "../Home/home";
import { LoginRegister } from "../loginRegister/loginRegister";
import { parseJwt } from "./jwtUtils";


export function Main() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    // Función para verificar si el usuario está autenticado
    const checkAuthentication = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            if (decodedToken) {
                setUsername(decodedToken.user); 
                setIsAuthenticated(true);
            }
        }
    };

    // Llamamos a esta función cuando se monta el componente para verificar la autenticación
    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <div className='container-main'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginRegister />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </div>
    );
}
