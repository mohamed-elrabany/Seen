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

export async function getGlucoseReadings(date) {
    const data= await handleRequest(
        api.get('/glucose-readings', 
            { params: { date } }, 
            { withCredentials: false }));

    return data.readings || [];
}