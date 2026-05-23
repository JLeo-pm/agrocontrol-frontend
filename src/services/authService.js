import { API_URL } from "./api";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok)
    throw new Error("Credenciales incorrectas");

  const data = await response.json();

  //GUARDAR TOKEN
  localStorage.setItem("token", data.token);
}