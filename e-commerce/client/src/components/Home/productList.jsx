import React from "react";
import { data } from "./data";
import "./home.css";

export function ProductList() {
  return (
    <div className="main-container">
      <div className="container-items">
        {data.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.img} alt={product.nameProduct} />
            <div className="info-product">
              <h3>{product.nameProduct}</h3>
              <p>S/{product.price}</p>
              <button className="button-add">Agregar al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
