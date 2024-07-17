import { Header } from "./header";
import { ProductList } from "./productList";
import { Footer } from "./footer";

import "./home.css";

export function Home() {
  return (
    <>
      <Header />
      <ProductList />
      <Footer />
    </>
  );
}
