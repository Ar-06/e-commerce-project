import React from 'react';
import styles from './addProduct.module.css';

const AddProductForm = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1>Agregar un producto</h1>
        <form className={styles.form}>
          <label htmlFor="name">Nombre del producto: </label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" name="description" required></textarea>
          <label htmlFor="price">Precio:</label>
          <input type="text" id="price" name="price" required />
          <label htmlFor="stock">Stock:</label>
          <input type="number" id="stock" name="stock" required />
          <label htmlFor="image">Imagen:</label>
          <input type="file" id="image" name="image" accept="image/*" required />
          <button type="submit">Agregar producto</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
