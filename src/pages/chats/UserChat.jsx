import EmptyIllustration from "../../components/ui/EmptyIllustration";
import emptyImg from "../../assets/no-msg.svg";
import MessageInput from "../../components/chats/MessageInput";
import MessageBubble from "../../components/chats/MessageBubble";
import UserChatHeader from "../../components/chats/UserChatHeader";

import { useEffect, useRef, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useChatMessages } from "../../hooks/chats/useChatMessages";
import { useDeleteMessage } from "../../hooks/chats/mutations/useDeleteMessage";
import { useEditMessage } from "../../hooks/chats/mutations/useEditMessage";
import { useConversations } from "../../hooks/chats/useConversations";
import { useMarkAsRead } from "../../hooks/chats/mutations/useMarkAsRead";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function UserChat() {
  const { receiverId } = useParams();
  const targetUserId = Number(receiverId);
  const { t } = useTranslation();
  
  const scrollContainerRef = useRef(null);
  const prevScrollHeightRef = useRef(0);
  const user = useSelector((state) => state.user.user);
  const currentUserId = user?.id;

  // 1. Grab the conversations already cached in your application state
  const { data: conversationsData } = useConversations();
  const { mutate: deleteMessage } = useDeleteMessage();
  const { mutate: editMessage } = useEditMessage();
  const [conv, setConv] = useState(null);

  // 2. Find the conversation matching this specific user ID
  useEffect(() => {
    if (conversationsData?.conversations && targetUserId && currentUserId) {
      const activeConversation = conversationsData.conversations.find((c) => {
        const isUser1 = Number(c.user1_id) === targetUserId && Number(c.user2_id) === currentUserId;
        const isUser2 = Number(c.user2_id) === targetUserId && Number(c.user1_id) === currentUserId;
        return isUser1 || isUser2;
      });

      if (activeConversation) {
        console.log("Found Active Conversation Context:", activeConversation);
        setConv(activeConversation);
      }
    }
  }, [conversationsData, targetUserId, currentUserId]);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useChatMessages(targetUserId, conv?.id);

  // Preserve scroll position when older messages are prepended
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const newScrollHeight = container.scrollHeight;
    const diff = newScrollHeight - prevScrollHeightRef.current;
    if (diff > 0) container.scrollTop += diff;
    prevScrollHeightRef.current = newScrollHeight;
  }, [data?.messages?.length]);

  // Scroll to bottom only on initial load
  useEffect(() => {
    if (!isLoading) {
      const container = scrollContainerRef.current;
      if (container) container.scrollTop = container.scrollHeight;
    }
  }, [isLoading]);

  // Trigger load older when scrolled to top
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (container.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      prevScrollHeightRef.current = container.scrollHeight;
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 3. This safely initializes hook mutations now that conv?.id resolves correctly
  const { mutate: triggerMarkAsRead } = useMarkAsRead(
    targetUserId,
    conv?.id
  );

  useEffect(() => {
    if (conv?.id && data?.messages?.length > 0) {
      triggerMarkAsRead();
    }
  }, [conv?.id, data?.messages?.length, triggerMarkAsRead]);

  // Determine other user's info for dynamic header rendering
  const otherUser = conv?.user1_id === currentUserId ? conv?.user2 : conv?.user1;

  console.log("UserChat Render: conv:", conv, "otherUser:", otherUser, "messages:", data?.messages);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Header */}
      <div className="shrink-0">
        <UserChatHeader 
          user={otherUser} 
        />
      </div>

      {/* Messages area */}
      <div
        className={`flex-1 overflow-y-auto no-scrollbar flex flex-col ${
          data?.messages?.length === 0
            ? "justify-center items-center"
            : "justify-end"
        }`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-400">...</p>
          </div>
        ) : data?.messages?.length === 0 ? (
          <EmptyIllustration
            imageSrc={emptyImg}
            title={t("chats.messages.empty.title")}
            description={t("chats.messages.empty.description")}
          />
        ) : (
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full flex flex-col gap-3 p-4 overflow-y-auto no-scrollbar"
          >
            {data?.messages.map((msg, index) => (
              <MessageBubble
                key={msg.id || index}
                message={msg}
                isOwnMessage={msg.sender_id === currentUserId}
                isRead={msg.is_read}
                onDelete={(messageId) => deleteMessage({ messageId, receiverId: targetUserId })}
                onEdit={(message) => editMessage({ message })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0">
        <MessageInput receiverId={receiverId} />
      </div>
    </div>
  );
}