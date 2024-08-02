import React, { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";

export function ProductList({ allProducts, setAllProducts, countProducts , setCountProducts , total, setTotal }) {
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

  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      const updatedProducts = allProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setAllProducts(updatedProducts);
    } else {
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }
    setTotal(total + product.price * 1);
    setCountProducts(countProducts + 1);
  };

  return (
    <div className="main-container">
      <div className="container-items">
        {seeProduct.length > 0 ? (
          seeProduct.map((product) => (
            <div className="card" key= {product.id}>
              <img
                src={`http://localhost:3000/images/${product.image}`}
                alt={product.name}
              />
              <div className="info-product">
                <h3>{product.name}</h3>
                <p>S/{product.price}</p>
                <button
                  className="button-add"
                  onClick={() => onAddProduct(product)}
                >
                  Agregar al carrito
                </button>
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
