import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components/Layout";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Product from "./pages/Product";
export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Catalogue />} />
        <Route path="/products/:slug" element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
}
