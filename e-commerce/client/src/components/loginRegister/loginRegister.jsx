import './loginRegister.css';
import { useState } from 'react';
import axios from 'axios';
import { Home } from '../Home/home';

export function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);

    const buttonClassRegister = `button ${isLogin ? '' : 'active'}`;
    const buttonClassLogin = `button ${isLogin ? 'active' : ''}`;

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false) 

    const handdleRegister = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/register', {
                user: user,
                email: email,
                password: password
            });
            console.log(response.data);
        } catch (e){
            console.log(e);
        }
    }

    const handdleLogin = (e) => {
        e.preventDefault()
        const data = {
          user: user,
          password: password
        }

        fetch('http://localhost:3000/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        
        .then(response => response.json())
        .then (result =>{
          console.log(result.token)

          if(result.token){
            localStorage.setItem('token', result.token)
            setLoginSuccess(true)

          } else {
            alert('Usuario o contraseña incorrectos')
          }
          
        })

        .catch(error => {
          console.log('Error:', error)
        })
    }
    

    const handleSignup = () => {
        setIsLogin(false);
    };

    const handleLogin = () => {
        setIsLogin(true);
    };

    return (
        <>{ loginSuccess ? <Home />:<div className='container'>
            <div className='sidebar'>
                <button onClick={handleLogin} className={buttonClassLogin}>Iniciar Sesión</button>
                <button onClick={handleSignup} className={buttonClassRegister}>Registrarse</button>
                
            </div>

            <div className={`form-wrapper ${isLogin ? 'login' : 'signup'}`}>
                <div className={`form form--signup ${isLogin ? '' : 'active'}`}>

                    <div className='form--heading'>¡Bienvenido! Regístrate</div>

                    <form>
                        <input name='user' value={user} onChange={(event) => (setUser(event.target.value))}  type="text" placeholder='Nombre de Usuario'/>
                        <input name='email' value={email} onChange={(event) => (setEmail(event.target.value))} type="email" placeholder='Email'/>
                        <input name='password' value={password} onChange={(event) => (setPassword(event.target.value))} type="password" placeholder='Contraseña'/>
                        <button onClick={handdleRegister} className='button' type="submit" >Registrarse</button>
                    </form>

                </div>

                <div className={`form form--login ${isLogin ? 'active' : ''}`}>

                    <div className='form--heading'>¡Bienvenido! Inicia Sesión</div>

                    <form autoComplete='off'>
                        <input onChange={(event) => (setUser(event.target.value))} type="text" placeholder='Nombre de Usuario' required/>
                        <input onChange={(event) =>(setPassword(event.target.value))} type="password" placeholder='Contraseña' required/>
                        <button onClick={handdleLogin} className='button' type="submit" >Iniciar Sesión</button>
                    </form>

                </div>

            </div>

        </div>}</> 
    );
}
