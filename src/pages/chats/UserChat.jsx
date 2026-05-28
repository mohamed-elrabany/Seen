import EmptyIllustration from "../../components/ui/EmptyIllustration";
import emptyImg from "../../assets/no-msg.svg";
import MessageInput from "../../components/chats/MessageInput";
import MessageBubble from "../../components/chats/MessageBubble";
import UserChatHeader from "../../components/chats/UserChatHeader";

import { useEffect, useRef, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useChatMessages } from "../../hooks/chats/useChatMessages";
import { useSelector } from "react-redux";
import { getConversationById } from "../../services/chatsServices";
import { useTranslation } from "react-i18next";

export default function UserChat() {
  const { receiverId } = useParams();
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const prevScrollHeightRef = useRef(0);
  const user = useSelector((state) => state.user.user);
  const [conv, setConv] = useState(null);

  useEffect(() => {
    const fetchConversation = async () => {
      if (receiverId) {
        try {
          const conversation = await getConversationById(Number(receiverId));
          console.log("Fetched conversation:", conversation);
          setConv(conversation);
        } catch (error) {
          console.error("Error fetching conversation:", error);
        }
      }
    };

    fetchConversation();
  }, [receiverId]);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useChatMessages(Number(receiverId));
  console.log("Chat Messages Data:", data);

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

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Header — fixed at top, never shrinks */}
      <div className="shrink-0">
        <UserChatHeader user={{ name: "John Doe" }} />
      </div>

      {/* Messages area — takes all remaining space, scrolls internally */}
      {/* Messages area */}
      <div
        // ref={scrollContainerRef}
        // onScroll={handleScroll}
        className={`flex-1 overflow-y-auto no-scrollbar flex flex-col ${
          data?.messages?.length === 0
            ? "justify-center items-center"
            : "justify-end"
        }`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-400">...</p> {/* or a spinner */}
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
          className="w-full flex flex-col gap-3 p-4 overflow-y-auto no-scrollbar">
            {data?.messages.map((msg, index) => (
              <MessageBubble
                key={msg.id || index}
                message={msg}
                isOwnMessage={msg.sender_id === user.id}
                isRead={msg.is_read}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input — fixed at bottom, never shrinks */}
      <div className="shrink-0">
        <MessageInput receiverId={receiverId} />
      </div>
    </div>
  );
}
