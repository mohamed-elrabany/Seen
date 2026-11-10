import { useEffect, useMemo } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEcho } from "../../providers/EchoProvider";
import { getChatMessages } from "../../services/chatsServices";
import { useSelector } from "react-redux";

const CHAT_STALE_TTL = 5 * 60 * 1000;
const chatTimers = new Map();

export function useChatMessages(receiverId, conversationId) {
  const { echo, isReady } = useEcho();
  const queryClient = useQueryClient();
  const currentUser = useSelector((state) => state.user.user);
  const currentUserId = currentUser?.id;
  const queryKey = useMemo(() => ["messages", Number(receiverId)], [receiverId]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => getChatMessages(Number(receiverId), pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined,
    staleTime: CHAT_STALE_TTL,
    gcTime: CHAT_STALE_TTL,
    select: (data) => ({
      messages: data.pages.flatMap((page) => page.data || []),
      pages: data.pages,
      pageParams: data.pageParams,
    }),
  });

  useEffect(() => {
    if (!echo || !isReady || !currentUserId || !receiverId || !conversationId) return;

    if (chatTimers.has(receiverId)) {
      clearTimeout(chatTimers.get(receiverId));
      chatTimers.delete(receiverId);
    }

    const channelName = `chat.${conversationId}`;
    console.log("📡 Subscribing to:", channelName);

    const channel = echo.private(channelName);

    channel.subscription.bind("pusher:subscription_succeeded", () => {
      console.log("✅ Actually subscribed to", channelName);
    });
    channel.subscription.bind("pusher:subscription_error", (err) => {
      console.error("❌ Subscription failed for", channelName, err);
    });

    // ─── New message ────────────────────────────────────────────
    channel.listen(".MessageSent", (rawPayload) => {
      const payload = typeof rawPayload === "string" ? JSON.parse(rawPayload) : rawPayload;

      console.log("🔥 RAW PAYLOAD:", payload);

      const pSender = Number(payload.sender_id);
      const pReceiver = Number(payload.receiver_id);
      const uiReceiver = Number(receiverId);
      const uiCurrentUser = Number(currentUserId);

      const belongsToThisChat =
        (pSender === uiReceiver && pReceiver === uiCurrentUser) ||
        (pSender === uiCurrentUser && pReceiver === uiReceiver);

      if (!belongsToThisChat) {
        console.warn("⚠️ FILTERED OUT — id mismatch:", { pSender, pReceiver, uiReceiver, uiCurrentUser });
        return;
      }

      queryClient.setQueryData(queryKey, (old) => {
        if (!old || !old.pages) return old;
        const pages = [...old.pages];
        const lastPageIndex = pages.length - 1;
        const lastPage = { ...pages[lastPageIndex] };

        const wsMessageId = payload.message_id;
        const alreadyExists = lastPage.data?.some((m) => m.id === wsMessageId);
        if (alreadyExists) return old;

        const newMsg = {
          id: wsMessageId,
          sender_id: pSender,
          receiver_id: pReceiver,
          message: payload.message_text,
          created_at: payload.created_at,
          is_read: false,
        };

        lastPage.data = [...(lastPage.data || []), newMsg];
        pages[lastPageIndex] = lastPage;
        return { ...old, pages };
      });
    });

    // ─── Message deleted ────────────────────────────────────────
    channel.listen(".message.deleted", (payload) => {
      console.log("🗑️ DELETE EVENT RECEIVED:", payload);

      queryClient.setQueryData(queryKey, (old) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: (page.data || []).filter((m) => m.id !== payload.message_id),
          })),
        };
      });
    });

    // ─── Message edited ─────────────────────────────────────────
    channel.listen(".message.updated", (payload) => {
      console.log("✏️ UPDATE EVENT RECEIVED:", payload);

      const updated = payload.message;
      if (!updated?.id) {
        console.warn("⚠️ Update payload missing message.id — check MessageResource shape", payload);
        return;
      }

      queryClient.setQueryData(queryKey, (old) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: (page.data || []).map((m) =>
              m.id === updated.id ? { ...m, message: updated.message ?? m.message } : m
            ),
          })),
        };
      });
    });

    // ─── Messages marked as seen ────────────────────────────────
    channel.listen(".message.seen", (payload) => {
  console.log("👀 SEEN EVENT RECEIVED:", payload);
  console.log("👀 viewer:", Number(payload.user_id), "| currentUserId:", Number(currentUserId));

      // The backend sends user_id = the person who just read the messages.
      // If that person is us, we don't need to do anything — we already
      // know we read our own screen. We only act when the *other* person
      // (the receiver) has read the messages we sent them.
      const viewer = Number(payload.user_id);
      if (viewer === Number(currentUserId)) return;

      queryClient.setQueryData(queryKey, (old) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: (page.data || []).map((m) =>
              m.sender_id === Number(currentUserId) ? { ...m, is_read: true } : m
            ),
          })),
        };
      });
    });

    return () => {
      console.log("🔌 Leaving Channel Room:", channelName);
      echo.leave(channelName);
      const timer = setTimeout(() => {
        queryClient.invalidateQueries({ queryKey });
        chatTimers.delete(receiverId);
      }, CHAT_STALE_TTL);
      chatTimers.set(receiverId, timer);
    };
  }, [echo, isReady, currentUserId, receiverId, conversationId, queryClient, queryKey]);

  return query;
}