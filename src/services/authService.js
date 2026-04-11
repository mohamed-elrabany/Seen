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
    const response = await api.post("/login", { email, password }, { withCredentials: false });
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "بيانات خاطئة";
  }
}

export async function register(userData) {
  try {
    const response = await api.post("/register", userData, { withCredentials: false });
    console.log(response.data);
    console.log('user Created Successfully');
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Registration failed";
  }
}

export async function userExists(email){
  const data= await handleRequest(
    api.post("/check-email",  { email }, { withCredentials: false })
  );
  return data.exists;
}