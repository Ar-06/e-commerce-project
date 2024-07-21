import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./home.css";

export function Footer() {
  return (
    <>
      <button className="btn-flotante">
        <Link to='/chat'>
          <FontAwesomeIcon icon={faHeadset} size="3x" color="white" />
        </Link>
      </button>
      <footer className="footer-tienda">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Productos</h3>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Unete a E-Tec</h3>
            <ul>
              <li>
                <Link to="/addProduct">Vende tus productos</Link>
              </li>
              <li>
                <Link to="/seeProduct">Gestiona los productos</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Empresa</h3>
            <ul>
              <li>
                <Link to="/aboutMe">Sobre Nosotros</Link>
              </li>
              <li>
                <Link to="/contact">Contactanos!</Link>
              </li>
            </ul>
          </div>
          <div className="footer-social">
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
