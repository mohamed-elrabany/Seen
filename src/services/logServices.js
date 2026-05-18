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

export async function addLog(logData){
    return handleRequest(
        api.post("/logs", logData)
    );
}

export async function editLog(logId, logData){
    return handleRequest(
        api.put(`/logs/${logId}`, logData)
    );
}

export async function deleteLog(logId){
    return handleRequest(
        api.delete(`/logs/${logId}`)
    );
}

export async function getLogDetails(logId){
    const data= await handleRequest(
        api.get(`/logs/${logId}`)
    );
    return data.log
}

export async function getLogs(date){
    return handleRequest(
        api.get(`/logs/user`, {
            params: { date }
            })
    );
}