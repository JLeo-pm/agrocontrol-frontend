//URL de tu backend .NET
//export const API_URL = "https://localhost:7088/api";
export const API_URL = "https://agrocontrol-api-1.onrender.com/api";

// Helper para requests con token
export function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

// ===== POTREROS =====
export async function crearPotrero(potrero) {
  const response = await fetch(`${API_URL}/potreros`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(potrero)
  });

  if (!response.ok)
    throw new Error("Error al crear potrero");
}

export async function eliminarPotrero(id) {
  const response = await fetch(`${API_URL}/potreros/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  if (!response.ok)
    throw new Error("Error al eliminar potrero");
}
// ======================
// ANIMALES
// ======================
export async function getAnimales() {
  const res = await fetch(`${API_URL}/animales`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Error animales");
  return res.json();
}

export async function crearAnimal(data) {
  const res = await fetch(`${API_URL}/animales`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text(); 
    console.error("🔥 ERROR BACKEND:", error);
    throw new Error(error);
  }

  return res.json();
}

export async function editarAnimal(id, data) {
  const res = await fetch(`${API_URL}/animales/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error editar animal");
}

export async function cambiarEstadoAnimal(id, estado) {
  const res = await fetch(`${API_URL}/animales/${id}/estado`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Number(estado)), // 👈 IMPORTANTE
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("🔥 ERROR BACKEND:", err);
    throw new Error("Error estado");
  }
}

export async function getPotreros() {
  const res = await fetch(`${API_URL}/potreros`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Error potreros");
  return res.json();
}