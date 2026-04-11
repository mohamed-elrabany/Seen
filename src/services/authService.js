import api from "../api/axios";

async function handleRequest(request){
    try{
        const response = await request;
        return response.data;
    }catch(error){
        throw error.response?.data?.message || 'Something wrong happened!';
    }
}

export async function login(email, password) {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "بيانات خاطئة";
  }
}

export async function register(userData) {
  try {
    const response = await api.post("/register", {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      gender: userData.gender,
      birthDate: userData.birthDate,
      weight: userData.weight,
      height: userData.height,
      diabeted_type: userData.diabetesType,
      insulin_therapy: userData.insulin,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function userExists(email){
  const data= await handleRequest(
    api.get("/check-email", { params: {email} })
  );
  return data.exists;
}