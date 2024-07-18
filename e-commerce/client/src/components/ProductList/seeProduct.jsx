import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./seeProduct.module.css";

export function SeeProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Swal.fire({
            icon: "error",
            title: "No autorizado",
            text: "Debes iniciar sesión para ver tus productos",
          });
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/users/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Datos recibidos:", response.data);

        if (response.data.products) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error al obtener productos", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al obtener productos",
        });
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1>Mis Productos</h1>
      <div className={styles.productList}>
        {products.length > 0 ? (
          <table className={styles.productTable}>
            <thead>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.productId} className={styles.productRow}>
                  <td>
                    <img
                      src={`http://localhost:3000/images/${product.image}`}
                      alt={product.name}
                      className={styles.productImage}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>S/{product.price}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
}
