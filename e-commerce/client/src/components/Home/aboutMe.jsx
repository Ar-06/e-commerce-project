import { Footer } from "./footer";
import styles from "./aboutMe.module.css";

export function AboutMe() {
  return (
    <>
      <div className={styles.AboutMe}>
        <h1>¿Quiénes Somos?</h1>
        <p>
          Somos una empresa dedicada a la venta de productos tecnológicos, con
          el objetivo de ofrecer la mejor calidad y precio a nuestros clientes,
          comprometida con la distribución de los mejores productos tecnológicos
          disponibles en el mercado. Nuestro objetivo principal es ofrecer a
          nuestros clientes una forma segura, eficiente y confiable de comprar
          en línea desde la comodidad de sus hogares. <br /> <br />
          Desde nuestros inicios, nos hemos dedicado a seleccionar
          cuidadosamente cada producto que ofrecemos, asegurándonos de que
          cumpla con los más altos estándares de calidad y rendimiento.
          Trabajamos en estrecha colaboración con los principales fabricantes y
          proveedores de tecnología para garantizar que nuestros clientes tengan
          acceso a las últimas innovaciones y los mejores productos disponibles
          en el mercado. <br />
          <br />
          Nos enorgullece ofrecer una amplia gama de productos tecnológicos, que
          incluyen teléfonos inteligentes, computadoras, tablets, gadgets y
          accesorios electrónicos. Nuestro equipo está formado por expertos en
          tecnología apasionados por brindar un servicio excepcional y una
          experiencia de compra satisfactoria a nuestros clientes. <br />
          <br />
          Más allá de simplemente vender productos, nos esforzamos por construir
          relaciones sólidas con nuestros clientes, basadas en la confianza, la
          transparencia y el compromiso con la excelencia. Estamos aquí para
          ayudar a nuestros clientes a encontrar los productos que mejor se
          adapten a sus necesidades y presupuesto, brindando asesoramiento
          experto y atención personalizada en cada paso del proceso de compra.
          <br />
          <br />
          Además, nos comprometemos a proporcionar un servicio de envío rápido
          y seguro, asegurándonos de que los productos lleguen a su destino de
          manera oportuna y en perfectas condiciones. Nuestro objetivo es
          superar las expectativas de nuestros clientes en cada interacción y
          convertirnos en su destino preferido para todas sus necesidades
          tecnológicas.
        </p>
      </div>
      <Footer />
    </>
  );
}
