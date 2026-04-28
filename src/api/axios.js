import axios from "axios";

const api= axios.create({
    baseURL:"https://inquisitorial-elba-undistractedly.ngrok-free.dev/api",
    withCredentials: true,
    headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

export default api;