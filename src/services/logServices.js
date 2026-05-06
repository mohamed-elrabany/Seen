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

export async function addLog(logData){
    return handleRequest(
        api.post("/add-log", { withCredentials: false }, logData)
    );
}

export async function editLog(logId, logData){
    return handleRequest(
        api.put(`/edit-log/${logId}`, { withCredentials: false }, logData)
    );
}

export async function deleteLog(logId){
    return handleRequest(
        api.delete(`/delete-log/${logId}`, { withCredentials: false })
    );
}

export async function getLogDetails(logId){
    return handleRequest(
        api.get(`/log-details/${logId}`, { withCredentials: false })
    );
}

export async function getLogs(){
    return handleRequest(
        api.get("/get-logs", { withCredentials: false })
    );
}