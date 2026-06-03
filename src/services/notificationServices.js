import api from "../api/axios";

async function handleRequest(request) {
  try {
    const response = await request;
    console.log("Notification Response:", response); // Log the entire response for debugging
    return response.data.notifications;
  } catch (error) {
    return {
      error: error || "Something wrong happened!",
    };
  }
}

export async function getNotifications(page = 1) {
  return handleRequest(api.get("/notifications", {params: { page }}));
}

/*[
  {
    "notification_id": 2,
    "user_id": 1,
    "title": "New Interaction 🎯",
    "message": "Mohamed liked your post.",
    "type": "like",
    "reference_id": 240,
    "is_read": false,
    "read_at": null,
    "created_at": "2026-06-03 04:15:44",
    "time_ago": "5 seconds ago",
    "extra_data": {
      "post_id": 240,
      "username": "Mohamed Loay",
      "likes_count": 1
    }
  },
  {
    "notification_id": 3,
    "user_id": 1,
    "title": "New Comment 💬",
    "message": "Mohamed commented on your post.",
    "type": "comment",
    "reference_id": 240,
    "is_read": false,
    "read_at": null,
    "created_at": "2026-06-03 04:18:11",
    "time_ago": "10 seconds ago",
    "extra_data": {
      "post_id": 240,
      "username": "Mohamed Loay",
      "comments_count": 1
    }
  }
]*/