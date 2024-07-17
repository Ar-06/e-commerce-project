import React, { useState } from "react";
import styles from "./addProduct.module.css";
import Swal from "sweetalert2";
import axios from "axios";

export function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("category", productCategory);
    formData.append("price", productPrice);
    formData.append("stock", productStock);
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      if (response.data.message === "Producto agregado") {
        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: "El producto fue agregado correctamente",
        }).then(() => {
          setProductName("");
          setProductDescription("");
          setProductCategory("");
          setProductPrice("");
          setProductStock("");
          setFile(null);
        });
      }
    } catch (error) {
      console.log("Error al agregar producto", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al agregar producto",
      });
    }
  };

  const selectHandler = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1>Agregar un producto</h1>
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
          <label htmlFor="description">Descripción:</label>
          <textarea
            onChange={(event) => setProductDescription(event.target.value)}
            id="description"
            name="description"
            value={productDescription}
            required
          ></textarea>
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
          <label htmlFor="image">Imagen:</label>
          <input
            onChange={selectHandler}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
          />
          <button type="submit">Agregar producto</button>
        </form>
      </div>
    </div>
  );
}
