const URL = "http://localhost:8081/api/productos";

// ==============================
// HEADERS CON JWT
// ==============================
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// ==============================
// MANEJO DE RESPUESTAS
// ==============================
async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text || response.statusText}`);
  }

  // Si la respuesta no tiene body
  if (response.status === 204) return null;

  return response.json();
}

// ==============================
// GET ALL
// ==============================
export async function getProductos() {
  const response = await fetch(URL, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// ==============================
// GET BY ID
// ==============================
export async function getProducto(id) {
  const response = await fetch(`${URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

// ==============================
// CREATE / UPDATE
// ==============================
export async function saveProducto(data, id) {
  const body = {
    codigo: data.codigo,
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: parseFloat(data.precio),
    marca: data.marca,
    categoriaId: data.categoriaId,
    activo: data.activo,
  };

  const response = await fetch(id ? `${URL}/${id}` : URL, {
    method: id ? "PUT" : "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

// ==============================
// DELETE
// ==============================
export async function deleteProducto(id) {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}

// ==============================
// ACTIVAR / DESACTIVAR
// ==============================
export async function activarProducto(id) {
  const response = await fetch(`${URL}/${id}/activar`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}

export async function desactivarProducto(id) {
  const response = await fetch(`${URL}/${id}/desactivar`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}
