import React, { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";

export function ProductList() {
  const [seeProduct, setSeeProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setSeeProduct(response.data); 
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="main-container">
      <div className="container-items">
        {seeProduct.length > 0 ? (
          seeProduct.map((product) => (
            <div className="card" key={product.id}>
              <img
                src={`http://localhost:3000/images/${product.image}`}
                alt={product.name}
              />
              <div className="info-product">
                <h3>{product.name}</h3>
                <p>S/{product.price}</p>
                <button className="button-add">Agregar al carrito</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
}
