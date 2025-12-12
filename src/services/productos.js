const URL = "http://localhost:8081/api/productos";

export async function getProductos() {
  return fetch(URL).then((r) => r.json());
}

export async function getProducto(id) {
  return fetch(`${URL}/${id}`).then((r) => r.json());
}

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

  if (!id) {
    return fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json());
  }

  return fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());
}

export async function deleteProducto(id) {
  return fetch(`${URL}/${id}`, { method: "DELETE" });
}

export const activarProducto = (id) =>
  fetch(`${URL}/${id}/activar`, { method: "PUT" }).then((r) => r.json());

export const desactivarProducto = (id) =>
  fetch(`${URL}/${id}/desactivar`, { method: "PUT" }).then((r) => r.json());
