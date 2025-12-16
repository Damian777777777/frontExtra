const URL = "http://localhost:8081/api/inventario";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  };
}

export async function getInventario() {
  return fetch(URL, {
    headers: getAuthHeaders()
  }).then((r) => r.json());
}

export async function getInventarioById(id) {
  return fetch(`${URL}/${id}`, {
    headers: getAuthHeaders()
  }).then((r) => r.json());
}

export async function saveInventario(data, id) {
  if (!id) {
    // Crear inventario
    return fetch(URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then((r) => r.json());
  }

  // Editar inventario
  return fetch(`${URL}/editar/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

export async function actualizarExistencia(id, nuevaExistencia) {
  return fetch(`${URL}/${id}/existencia`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ existencia: nuevaExistencia }),
  }).then((r) => r.json());
}

export async function deleteInventario(id) {
  return fetch(`${URL}/${id}`, { 
    method: "DELETE",
    headers: getAuthHeaders()
  });
}

// Activar / Desactivar
export const activarInventario = (id) =>
  fetch(`${URL}/${id}/activar`, { 
    method: "PUT",
    headers: getAuthHeaders()
  }).then((r) => r.json());

export const desactivarInventario = (id) =>
  fetch(`${URL}/${id}/desactivar`, { 
    method: "PUT",
    headers: getAuthHeaders()
  }).then((r) => r.json());