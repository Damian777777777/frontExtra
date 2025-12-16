import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- importamos
import { login, register, setToken } from "../../services/auth";
import "./Login.css";

export default function LoginPage() {
  const navigate = useNavigate(); // <-- hook para navegar
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async () => {
    try {
      let data;
      if (isRegister) {
        data = await register(form);
        alert("Registro exitoso, ahora inicia sesión");
        setIsRegister(false);
        setForm({ email: "", password: "" });
      } else {
        data = await login(form);
        setToken(data.token);
        navigate("/home"); // <-- redirige al home
      }
      setError("");
    } catch (e) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? "Registrarse" : "Iniciar Sesión"}</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        placeholder="Correo"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="btn-primary" onClick={handleSubmit}>
        {isRegister ? "Registrarse" : "Iniciar Sesión"}
      </button>
      <div className="toggle-link">
        {isRegister ? (
          <>
            ¿Ya tienes cuenta?{" "}
            <span onClick={() => setIsRegister(false)}>Inicia sesión</span>
          </>
        ) : (
          <>
            ¿No tienes cuenta?{" "}
            <span onClick={() => setIsRegister(true)}>Regístrate</span>
          </>
        )}
      </div>
    </div>
  );
}
