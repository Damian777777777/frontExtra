const URL = "http://localhost:8081/api/auth";

// Login
export async function login(data) {
  const res = await fetch(`${URL}/login`, {  // ← Corregido: fetch() no fetch``
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Credenciales inválidas");
  return res.json();
}

// Register (añade esta función si la necesitas)
export async function register(data) {
  const res = await fetch(`${URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al registrar");
  return res.json();
}

// Cerrar sesión
export function doLogout() {
  localStorage.removeItem("token");
}

// Token
export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}