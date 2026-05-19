import api from "../api/axios";

async function handleRequest(request){
    try{
        const response = await request;
        return response.data.data;
    }catch(error){
        return {
            error: error || "Something wrong happened!"
        }
    }
}

export async function getMedications() {
  return handleRequest(api.get("/selected-medications"));
}

export async function addMedications(medicationName) {
  return handleRequest(
    api.post("/selected-medications", {
      medication_name: medicationName,
    }),
  );    
}