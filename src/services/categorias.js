const BASE = "http://localhost:8081/api/categorias";

// Obtener todas
export async function getCategorias() {
  return fetch(BASE).then((r) => r.json());
}

// Obtener una
export async function getCategoria(id) {
  return fetch(`${BASE}/${id}`).then((r) => r.json());
}

// Crear o editar
export async function saveCategoria(data, id) {
  const url = id ? `${BASE}/editar/${id}` : BASE;
  const method = id ? "PUT" : "POST";

  return fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

// Eliminar
export async function deleteCategoria(id) {
  return fetch(`${BASE}/${id}`, { method: "DELETE" });
}

// ACTIVAR
export async function activarCategoria(id) {
  return fetch(`${BASE}/${id}/activar`, {
    method: "PUT",
  }).then((r) => r.json());
}

// DESACTIVAR
export async function desactivarCategoria(id) {
  return fetch(`${BASE}/${id}/desactivar`, {
    method: "PUT",
  }).then((r) => r.json());
}
