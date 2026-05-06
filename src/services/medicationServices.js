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

export async function getMedications(){
    const result = await handleRequest(
        api.get("/medications", { withCredentials: false })
    );
    return result.medications;
}


export async function addMedication(medicineData) {
    return handleRequest(
    api.post("/add-medicine", { withCredentials: false }, medicineData)
  );
}