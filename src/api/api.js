const API_URL = "https://localhost:7088/api";

export async function getPotreros() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/Potreros`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok)
    throw new Error("Error al obtener potreros");

  return response.json();
}