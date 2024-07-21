import React, { useState, useEffect } from "react";
import styles from "./addProduct.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../Home/header";
import { Footer } from "../Home/footer";

export function AddProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchProducts = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:3000/products/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const product = response.data.products;
          setProductName(product.name);
          setProductDescription(product.description);
          setProductCategory(product.category);
          setProductPrice(product.price);
          setProductStock(product.stock);
        } catch (error) {
          console.error("Error al obtener producto", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener producto",
          });
        }
      };
      fetchProducts();
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("category", productCategory);
    formData.append("price", productPrice);
    formData.append("stock", productStock);
    if (file) {
      formData.append("image", file);
    }

    try {
      const token = sessionStorage.getItem("token");
      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:3000/users/products/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/products",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response && response.data && response.data.message) {
        const successMessage =
          response.data.message === "Producto actualizado"
            ? "Producto actualizado correctamente"
            : "Producto agregado correctamente";
        Swal.fire({
          icon: "success",
          title: response.data.message,
          text: successMessage,
        }).then(() => {
          setProductName("");
          setProductDescription("");
          setProductCategory("");
          setProductPrice("");
          setProductStock("");
          setFile(null);
          navigate(isEditing ? "/seeProduct" : "/home");
        });
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (error) {
      console.error("Error al agregar o actualizar producto", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al agregar o actualizar producto",
      });
    }
  };

  const selectHandler = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <h1>{isEditing ? "Editar Producto" : "Agregar Producto"}</h1>
          <form className={styles.form} onSubmit={submitHandler}>
            <label htmlFor="name">Nombre del producto: </label>
            <input
              onChange={(event) => setProductName(event.target.value)}
              type="text"
              id="name"
              name="name"
              value={productName}
              required
            />
            <label htmlFor="category">Categoría: </label>
            <input
              onChange={(event) => setProductCategory(event.target.value)}
              type="text"
              id="category"
              name="category"
              value={productCategory}
              required
            />
            <label htmlFor="price">Precio: </label>
            <input
              onChange={(event) => setProductPrice(event.target.value)}
              type="text"
              id="price"
              name="price"
              value={productPrice}
              required
            />
            <label htmlFor="stock">Stock:</label>
            <input
              onChange={(event) => setProductStock(event.target.value)}
              type="number"
              id="stock"
              name="stock"
              value={productStock}
              required
            />
            <label htmlFor="description">Descripción:</label>
            <textarea
              onChange={(event) => setProductDescription(event.target.value)}
              id="description"
              name="description"
              value={productDescription}
              required
            ></textarea>
            <label htmlFor="image">Imagen:</label>
            <input
              onChange={selectHandler}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required={!isEditing}
            />
            <button type="submit">
              {isEditing ? "Actualizar Producto" : "Agregar Producto"}
            </button>
          </form>
        </div>
      </div>
      <br /> <br /> <br />
      <Footer />
    </>
  );
}
