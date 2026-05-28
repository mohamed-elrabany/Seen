// WebSocket complexity will live here, along with any message parsing and formatting logic
import { useEffect, useRef } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEcho } from "../../providers/EchoProvider";
import { getChatMessages } from "../../services/chatsServices";
import { useSelector } from "react-redux";

const CHAT_STALE_TTL = 5 * 60 * 1000;
const chatTimers = new Map();


export function useChatMessages(receiverId) {
  const echoRef = useEcho();
  const queryClient = useQueryClient();
  const currentUser = useSelector((state) => state.user.user);
const currentUserId = currentUser?.id;
  const queryKey = ["messages", receiverId];

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => getChatMessages(receiverId, pageParam),

    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined,

    staleTime: CHAT_STALE_TTL,
    gcTime: CHAT_STALE_TTL,

    select: (data) => ({
      // asc from backend, pages load oldest first → just flatten, no reversal
      messages: data.pages.flatMap((page) => page.data),
      pages: data.pages,
      pageParams: data.pageParams,
    }),
  });

useEffect(() => {
  if (!echoRef.current || !currentUserId || !receiverId) {
    console.log("🔴 Echo not ready:", {
      echoReady: !!echoRef.current,
      currentUserId,
      receiverId,
    });
    return;
  }

  if (chatTimers.has(receiverId)) {
    clearTimeout(chatTimers.get(receiverId));
    chatTimers.delete(receiverId);
  }

  const channelName = `chat.${receiverId}`;
  console.log("📡 Subscribing to channel:", channelName);
  console.log("🔌 State:", echoRef.current?.connector?.pusher?.connection?.state);

  echoRef.current
    .private(channelName)
    .listen("MessageSent", (payload) => {
      console.log("✅ WS message received:", payload);
      queryClient.setQueryData(queryKey, (old) => {
        console.log("🟡 old cache:", old);
        if (!old) return old;
        const pages = [...old.pages];
        const lastPage = { ...pages[pages.length - 1] };
        lastPage.data = [
          ...lastPage.data,
          {
            id: payload.message_id,
            sender_id: payload.sender_id,
            receiver_id: payload.receiver_id,
            message: payload.message_text, // ← backend field is message_text in WS, map to message
            created_at: payload.created_at,
          },
        ];
        pages[pages.length - 1] = lastPage;
        return { ...old, pages };
      });
    });

  return () => {
    if (echoRef.current) {
      echoRef.current.leave(channelName);
    }
    const timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey });
      chatTimers.delete(receiverId);
    }, CHAT_STALE_TTL);
    chatTimers.set(receiverId, timer);
  };
}, [echoRef, currentUserId, receiverId]);
  return query;
}
