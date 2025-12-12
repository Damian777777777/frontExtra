import React from "react";
import { Link } from "react-router-dom";
import "./SideNavbar.css";

export default function SideNavbar() {
  return (
    <div className="side-navbar bg-dark text-white">
      <ul className="nav flex-column p-3">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/">Inicio</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/inventario">Inventario</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/productos">Productos</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/categorias">Categorías</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/movimientos">Movimientos</Link>
        </li>
      </ul>
    </div>
  );
}
