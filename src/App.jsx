import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import SideNavbar from "./components/SideNavbar";

import Home from "./pages/Home/page";
import ProductosPage from "./pages/Productos/page";
import CategoriasPage from "./pages/Categorias/page";
import InventarioPage from "./pages/Inventario/page";
import MovimientosPage from "./pages/Movimientos/page";

export default function App() {
  return (
    <BrowserRouter>
      <TopNavbar />
      <SideNavbar />

      <div style={{ marginLeft: "220px", padding: "20px", marginTop: "56px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventario" element={<InventarioPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/movimientos" element={<MovimientosPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
