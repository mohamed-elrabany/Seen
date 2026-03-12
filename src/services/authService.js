import api from "../api/axios";

export async function login(email, password) {
  const response = await api.post("/login", { email, password,});
  
  if (!response.ok) {
    return { error: response.message || "بيانات خاطئة" };
  }

  return response.data;

}
