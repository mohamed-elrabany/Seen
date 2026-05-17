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

export async function addReminder(data){
    return handleRequest(
        api.post("/reminders", data)
    );
}

export async function updateReminderStatus(reminderId, status){
    return handleRequest(
        api.put(`/reminders/${reminderId}/status`, { status })
    );
}
