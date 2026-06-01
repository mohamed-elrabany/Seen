import api from "../api/axios";

async function handleRequest(request) {
  try {
    const response = await request;
    console.log("Assistant response:", response);
    return response.data.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
}

export async function askChatbot(message) {
   try{
        const response = await api.post("/chatbot/ask", { message });
        console.log("Assistant response:", response);
        return response.data.answer;
    }catch(error){
        throw new Error(error?.response?.data?.message || "Something went wrong!");
    }
}

export async function chatbotHistory() {
    try{
        const response = await api.get("/chatbot/history");
        return response.data.history;
    }catch(error){
        throw new Error(error?.response?.data?.message || "Something went wrong!");
    }
}