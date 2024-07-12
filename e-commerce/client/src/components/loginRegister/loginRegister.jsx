import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './loginRegister.module.css';

export function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const buttonClassRegister = `${styles.button} ${isLogin ? '' : styles.active}`;
    const buttonClassLogin = `${styles.button} ${isLogin ? styles.active : ''}`;

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handdleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', {
                user: user,
                email: email,
                password: password
            });
            console.log(response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                history.push('/home');
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handdleLogin = (e) => {
        e.preventDefault();
        const data = {
            user: user,
            password: password
        }

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result.token);

                if (result.token) {
                    localStorage.setItem('token', result.token);
                    navigate('/home');
                } else {
                    alert('Usuario o contraseña incorrectos');
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }

    const handleSignup = () => {
        setIsLogin(false);
    };

    const handleLogin = () => {
        setIsLogin(true);
    };

    return (
        <div className={styles.loginRegisterContainer}>
            <div className={styles.sidebar}>
                <button onClick={handleLogin} className={buttonClassLogin}>Iniciar Sesión</button>
                <button onClick={handleSignup} className={buttonClassRegister}>Registrarse</button>
            </div>
            <div className={`${styles.formWrapper} ${isLogin ? styles.login : styles.signup}`}>
                <div className={`${styles.form} ${styles.formSignup} ${isLogin ? '' : styles.active}`}>
                    <div className={styles.formHeading}>¡Bienvenido! Regístrate</div>
                    <form>
                        <input name='user' value={user} onChange={(event) => setUser(event.target.value)} type="text" placeholder='Nombre de Usuario' />
                        <input name='email' value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder='Email' />
                        <input name='password' value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder='Contraseña' />
                        <button onClick={handdleRegister} className={styles.button} type="submit">Registrarse</button>
                    </form>
                </div>
                <div className={`${styles.form} ${styles.formLogin} ${isLogin ? styles.active : ''}`}>
                    <div className={styles.formHeading}>¡Bienvenido! Inicia Sesión</div>
                    <form autoComplete='off'>
                        <input onChange={(event) => setUser(event.target.value)} type="text" placeholder='Nombre de Usuario' required />
                        <input onChange={(event) => setPassword(event.target.value)} type="password" placeholder='Contraseña' required />
                        <button onClick={handdleLogin} className={styles.button} type="submit">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
