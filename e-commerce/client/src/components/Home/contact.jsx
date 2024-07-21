import React, { useState } from "react";
import Swal from "sweetalert2";
import style from "./contact.module.css";
import { Footer } from "./footer";
import axios from "axios";
import { Header } from "./header";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/contact", {
        name,
        email,
        message,
      });

      console.log("Response Data:", response.data);

      if (response.data.message === "Mensaje enviado correctamente") {
        Swal.fire({
          icon: "success",
          title: "Mensaje enviado",
          text: "Tu mensaje ha sido enviado correctamente",
        }).then(() => {
          setName("");
          setEmail("");
          setMessage("");
        });
      } 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al enviar el mensaje. Por favor, inténtalo de nuevo",
      });
    }
  };

  return (
    <>
      <Header />
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleContact}>
          <h2>CONTÁCTANOS</h2>

          <input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Escribe tu nombre aquí..."
            required
          />

          <input
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email para comunicarnos contigo..."
            required
          />

          <input
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="¿Qué te gustaría contarnos...?"
            required
          />

          <button>Enviar</button>
          <div className={style.contact}>
            <span className="fa fa-phone"></span>939 431 143
            <span className="fa fa-envelope-o"></span> E-tec@gmail.com
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}
