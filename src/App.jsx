import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import SideNavbar from "./components/SideNavbar";

import Home from "./pages/Home/page";
import ProductosPage from "./pages/Productos/page";
import CategoriasPage from "./pages/Categorias/page";
import InventarioPage from "./pages/Inventario/page";
import MovimientosPage from "./pages/Movimientos/page";
import LoginPage from "./pages/login/LoginPage";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/*"
          element={
            <>
              <TopNavbar />
              <SideNavbar />
              <div style={{ marginLeft: "220px", padding: "20px", marginTop: "56px" }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/inventario"
                    element={
                      <PrivateRoute>
                        <InventarioPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/productos"
                    element={
                      <PrivateRoute>
                        <ProductosPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/categorias"
                    element={
                      <PrivateRoute>
                        <CategoriasPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/movimientos"
                    element={
                      <PrivateRoute>
                        <MovimientosPage />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
