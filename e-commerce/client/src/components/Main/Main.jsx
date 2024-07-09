import { Home } from "../Home/home";
import { LoginRegister } from "../loginRegister/loginRegister";

function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

let isTokenValid = parseJwt(localStorage.getItem('token'))?.exp * 1000 > Date.now()

export function Main() {
    return (
        <> {isTokenValid ? <Home /> : <LoginRegister />} </>
    );
}
