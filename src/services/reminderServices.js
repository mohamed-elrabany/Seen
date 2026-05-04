import api from "../api/axios";

async function handleRequest(request){
    try{
        const response = await request;
        return response.data;
    }catch(error){
        return {
            error: error || "Something wrong happened!"
        }
    }
}

export async function addReminder(data){
    return handleRequest(
        api.post("/add-reminder", { withCredentials: false }, data)
    );
}

export async function addMedicine(medicineData) {
    return handleRequest(
    api.post("/add-medicine", { withCredentials: false }, medicineData)
  );
}