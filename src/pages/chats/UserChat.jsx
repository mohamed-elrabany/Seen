import EmptyIllustration from "../../components/ui/EmptyIllustration";
import emptyImg from "../../assets/no-msg.svg";
import MessageInput from "../../components/chats/MessageInput";
import MessageBubble from "../../components/chats/MessageBubble";
import UserChatHeader from "../../components/chats/UserChatHeader";

import { useState } from "react";

export default function UserChat() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      
      {/* Header — fixed at top, never shrinks */}
      <div className="shrink-0">
        <UserChatHeader user={{ name: "John Doe" }} />
      </div>

      {/* Messages area — takes all remaining space, scrolls internally */}
      <div className={`flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col ${
        messages.length === 0 ? "justify-center items-center" : "justify-end"
      }`}>
        {messages.length === 0 ? (
          <EmptyIllustration
            imageSrc={emptyImg}
            title={"لا توجد رسائل بعد"}
            description={"كن أول من يرسل رسالة في هذه المحادثة!"}
          />
        ) : (
          <div className="w-full flex flex-col gap-3">
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg.text}
                isOwnMessage={msg.isOwn}
                isRead={msg.isRead}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input — fixed at bottom, never shrinks */}
      <div className="shrink-0">
        <MessageInput />
      </div>

    </div>
  );
}