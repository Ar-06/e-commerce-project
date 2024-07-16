import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './loginRegister.module.css';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const buttonClassRegister = `${styles.button} ${isLogin ? '' : styles.active}`;
    const buttonClassLogin = `${styles.button} ${isLogin ? styles.active : ''}`;

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', {
                user,
                email,
                password,
            });
            //console.log('Response Data:', response.data); 
            if (response.data.message === 'Usuario registrado') {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso!',
                    text: 'Por favor, inicia sesión para continuar',
                    confirmButtonText: 'Iniciar Sesión'
                }) .then (() => {
                    setIsLogin(true);
                    setUser('');
                    setEmail('');
                    setPassword('');
                })
            }
        } catch (error) {
            if(error.response && error.response.data.message === 'El nombre de usuario ya existe') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El nombre de usuario ya existe. Por favor, elige otro'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al registrar usuario. Por favor, inténtalo de nuevo'
            })
        }}
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                user,
                password
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                if(response.data.token) {
                    Swal.fire ({
                        icon: 'success',
                        title: 'Bienvenido!',
                        text: 'Iniciaste sesión correctamente',
                        showConfirmButton: false,
                        timer: 1500

                    }).then (() => {
                        navigate('/home')
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo'
                })
            }
        } catch (error) { 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al iniciar sesión. Por favor, inténtalo de nuevo'
            })
        }
    }

    const handleSignup = () => {
        setIsLogin(false);
    };

    const handleLoginClick = () => {
        setIsLogin(true);
    };

    return (
        <div className={styles.loginRegisterContainer}>
            <div className={styles.sidebar}>
                <button onClick={handleLoginClick} className={buttonClassLogin}>Iniciar Sesión</button>
                <button onClick={handleSignup} className={buttonClassRegister}>Registrarse</button>
                <span className={styles.sidebarSpan}>¿No tienes una cuenta? ¡Regístrate!</span>
            </div>
            <div className={`${styles.formWrapper} ${isLogin ? styles.login : styles.signup}`}>
                <div className={`${styles.form} ${styles.formSignup} ${isLogin ? '' : styles.active}`}>
                    <div className={styles.formHeading}>¡Bienvenido! Regístrate</div>
                    <form onSubmit={handleRegister}>
                        <input name='user' value={user} onChange={(event) => setUser(event.target.value)} type="text" placeholder='Nombre de Usuario' required />
                        <input name='email' value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder='Email' required />
                        <input name='password' value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder='Contraseña' required />
                        <button className={styles.button} type="submit">Registrarse</button>
                    </form>
                </div>
                <div className={`${styles.form} ${styles.formLogin} ${isLogin ? styles.active : ''}`}>
                    <div className={styles.formHeading}>¡Bienvenido! Inicia Sesión</div>
                    <form onSubmit={handleLogin} autoComplete='off'>
                        <input value={user} onChange={(event) => setUser(event.target.value)} type="text" placeholder='Nombre de Usuario' required />
                        <div className={styles.passwordWrapper}>
                            <input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text':'password'} placeholder='Contraseña' required />
                            <button type='button' onClick={toggleShowPassword} className={styles.showPasswordButton}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <button className={styles.button} type="submit">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>        
    );
}
