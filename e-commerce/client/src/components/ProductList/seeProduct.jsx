import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./seeProduct.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SeeProduct() {
  const [products, setProducts] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Swal.fire({
            icon: "error",
            title: "No autorizado",
            text: "Debes iniciar sesión para ver tus productos",
          }).then(() => {
            Navigate("/login");
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

        //console.log("Datos recibidos:", response.data);

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

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "No autorizado",
        text: "Debes iniciar sesión para eliminar un producto",
      });
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/users/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: "El producto ha sido eliminado correctamente",
      }).then(() => {
        window.location.reload();
      });

      setProducts(products.filter((product) => product.id !== product.id));
    } catch (error) {
      console.log("Error al eliminar producto", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al eliminar producto",
      });
    }
  };

  return (
    <div className={styles.pagesContainer}>
      <h1 className={styles.title}>Mis Productos</h1>
      <div className={styles.productList}>
        {products.length > 0 ? (
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={styles.productRow}>
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
                  <td>
                    <Link to={`/editProduct/${product.id}`}>
                      <button className={styles.editButton}>Editar</button>
                    </Link>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Eliminar
                    </button>
                  </td>
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
