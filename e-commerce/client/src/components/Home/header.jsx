import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { parseJwt } from "../Main/jwtUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import "./home.css";

export function Header({ allProducts, setAllProducts, total, countProducts, setTotal, setCountProducts }) {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setUsername(decodedToken.user);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
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

  const onDeleteProduct = (product) => {
    const updatedProducts = allProducts.filter((p) => p.id !== product.id);
    setAllProducts(updatedProducts);
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
  }

  const onClearAll = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  }
  

  return (
    <>
      <header className="header-tienda">
        <div className="logo-container">
          <FontAwesomeIcon
            icon={faStore}
            size="2x"
            style={{ color: "black" }}
          />
          <h1 className="title-tienda">E-Tec</h1>
        </div>
        <nav className="nav-tienda">
          {isLoggedIn ? (
            <>
              <span className="welcome-message">
                Bienvenido(a), {username}!
              </span>
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
                icon={faUserRegular}
                size="2x"
                style={{ color: "black" }}
              />
            </Link>
          )}

          <div className="container-icon">
            <div
              className="container-cart-icon"
              onClick={() => setActive(!active)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="icon-cart"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <div className="count-products">
                <span id="contador-productos">{countProducts}</span>
              </div>
            </div>

            <div
              className={`container-cart-products ${
                active ? "" : "hidden-cart"
              } `}
            >
              {allProducts && allProducts.length > 0 ? (
                <>
                  <div className="row-product">
                    {allProducts.map((product) => (
                      <div className="cart-product" key={product.idProduct}>
                        <div className="info-cart-product">
                          <span className="cantidad-producto-carrito">
                            {product.quantity}
                          </span>
                          <p className="titulo-producto-carrito">
                            {product.name}
                          </p>
                          <span className="precio-producto-carrito">
                            S/{product.price}
                          </span>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="icon-close"
                          onClick={() => onDeleteProduct(product)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>

                  <div className="cart-total">
                    <h3>Total:</h3>
                    <span className="total-pagar">S/{total}</span>
                  </div>
                  <button className="btn-clear-all" onClick={onClearAll}>Vaciar Carrito</button>
                </>
              ) : (
                <p className="cart-empty">El carrito está vacío</p>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
