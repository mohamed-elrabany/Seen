import api from "../api/axios";

async function handleRequest(request) {
  try {
    const response = await request;
    return response.data.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
}

// ─── Conversations ─────────────────────────────────────────────

export function getConversations(page = 1) {
  return handleRequest(api.get("/conversations", { params: { page } }));
}

export function getConversationById(conversation_id) {
  return handleRequest(api.get(`/conversations/${conversation_id}`));
}

// ─── Messages ──────────────────────────────────────────────────

// export function getChatMessages(receiver_id, page = 1) {
//   return handleRequest(
//     api.get(`/messages/chat/${receiver_id}`, {
//       params: { page },
//     }),
//   );
// }

export function getChatMessages(receiver_id, page = 1) {
  return api
    .get(`/messages/chat/${receiver_id}`, { params: { page } })
    .then((res) => {
      // No conversation yet — backend returns { success: true, data: [] }
      if (res.data.success === true) {
        return { current_page: 1, last_page: 1, data: [] };
      }
      // Has messages — backend returns raw Laravel paginator
      // { current_page, last_page, data: [...messages] }
      return res.data;
    })
    .catch((error) => {
      throw new Error(error?.response?.data?.message || "Something went wrong!");
    });
}

// export function sendMessage(receiver_id, message, file = null) {
//   // FormData is required because the message can include image/voice/video
//   const formData = new FormData();
//   formData.append("receiver_id", receiver_id);

//   if (message) formData.append("message", message);

//   // file = { type: "image"|"voice"|"video", file: File }
//   if (file) formData.append(file.type, file.file);

//   return handleRequest(
//     api.post("/messages", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     })
//   );
// }

export function sendMessage(receiver_id, message) {
  return handleRequest(
    api.post("/messages", {
      receiver_id,
      message,
    }),
  );
}

export function editMessage(message_id, message) {
  return handleRequest(api.put(`/messages/${message_id}`, { message }));
}

export function deleteMessage(message_id) {
  return handleRequest(api.delete(`/messages/${message_id}`));
}

// ─── Read Receipts ─────────────────────────────────────────────

export function markAsRead(conversation_id) {
  return handleRequest(
    api.post(`/conversations/${conversation_id}/mark-as-read`),
  );
}

// ─── Search For Friends ─────────────────────────────────────────────

export function friendsSearch(query, page) {
  return handleRequest(
    api.get("/search/friends", {
      params: { query, page },
    }),
  );
}
