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
