import React, { useState, useEffect, useRef } from "react";
import { getToken, doLogout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./TopNavbar.css";

export default function TopNavbar() {
  const navigate = useNavigate();
  const token = getToken();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  let user = { nombre: "", rol: "", foto: "" };

  if (token) {
    try {
      const decoded = jwtDecode(token);
      user.nombre = decoded.email; 
      user.rol = decoded.rol;
    } catch (err) {
      console.error("Token inválido");
    }
  }

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    doLogout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="top-navbar-info">
      <div className="user-info">
        {user.foto ? (
          <img src={user.foto} alt="Avatar" className="user-avatar" />
        ) : (
          <div className="user-avatar-placeholder">
            {user.nombre ? user.nombre[0].toUpperCase() : "U"}
          </div>
        )}
        <div className="user-details">
          <span className="user-name">{user.nombre || "Usuario"}</span>
          <span className="user-role">{user.rol || "Rol"}</span>
        </div>
      </div>
      <div className="user-actions">
        <button className="btn-notifications" title="Notificaciones">
          🔔
        </button>
        <div className="dropdown" ref={dropdownRef}>
          <button className="btn-menu" onClick={toggleDropdown}>
            ⚙️
          </button>
          <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
            <a href="/perfil">Perfil</a>
            <a href="/ajustes">Ajustes</a>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
}