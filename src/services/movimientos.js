const URL = "http://localhost:8081/api/movimientos";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  };
}

export async function getMovimientos() {
  return fetch(URL, {
    headers: getAuthHeaders()
  }).then(r => r.json());
}

export async function getMovimientoById(id) {
  return fetch(`${URL}/${id}`, {
    headers: getAuthHeaders()
  }).then(r => r.json());
}

export async function saveMovimiento(data, id) {
  // Para movimientos no se edita, solo se agrega
  return fetch(URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json());
}

export async function deleteMovimiento(id) {
  return fetch(`${URL}/${id}`, { 
    method: "DELETE",
    headers: getAuthHeaders()
  });
}