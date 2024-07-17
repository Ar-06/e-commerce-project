import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { parseJwt } from "../Main/jwtUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./home.css";

export function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/home");
    });
  };

  return (
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
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="2x"
                style={{ color: "black" }}
              />
            </button>
          </>
        ) : (
          <Link to="/login" className="button-login">
            <FontAwesomeIcon
              icon={faUser}
              size="2x"
              style={{ color: "black" }}
            />
          </Link>
        )}
        <button className="button-carrito">
          <div className="icon-container">
            <FontAwesomeIcon
              icon={faShoppingCart}
              size="2x"
              style={{ color: "black" }}
            />
          </div>
        </button>
        <button className="button-menu" onClick={toggleMenu}>
          <div className="icon-container">
            <FontAwesomeIcon
              icon={faBars}
              size="2x"
              style={{ color: "black" }}
            />
          </div>
        </button>
      </nav>
      {menuVisible && (
        <ul className={`menu-lisa ${menuVisible ? "active" : ""}`}>
          <li>
            <a href="/inicio">Categoria 1</a>
          </li>
          <li>
            <a href="#">Categoría 2</a>
          </li>
          <li>
            <a href="#">Categoria 3</a>
          </li>
        </ul>
      )}
    </header>
  );
}
