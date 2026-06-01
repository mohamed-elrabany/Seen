import MessageInput from "../../components/assistant/MessageInput";
import Bubble from "../../components/assistant/Bubble";
import BotChatHeader from "../../components/assistant/BotHeader";
import { useState, useEffect } from "react";

import { useChatHistory } from "../../hooks/assistant/useChatHistory";
import { useSendMessage } from "../../hooks/assistant/useSendMessage";
import { useChatScroll } from "../../hooks/assistant/useChatScroll";
import { useTranslation } from "react-i18next";
import LoadingPage from "../loading/LoadingPage";

export default function Assistant() {
  const { data: history, isLoading } = useChatHistory();
  console.log("Chat history:", history);
  const { mutate: sendMessage, isPending } = useSendMessage();

  const {bottomRef, containerRef} = useChatScroll(history);
  useEffect(() => {
    console.log("Pending: ", isPending);
  }, [isPending]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Header — fixed at top, never shrinks */}
      <div className="shrink-0">
        <BotChatHeader />
      </div>

      {/* Messages area */}
      <div
        className={`w-full flex-1 overflow-hidden flex flex-col ${
          history?.length === 0 ? "justify-center items-center" : "justify-end"
        }`}
      >
        {history?.length === 0 ? (
          <p className="text-gray-400 text-sm">Empty chat history</p>
        ) : (
          <div
            ref={containerRef}
            className="w-full flex flex-col gap-4 px-4 py-8 overflow-y-auto no-scrollbar"
          >
            {history.map((msg, index) => (
              <Bubble key={index} role={msg.role} content={msg.content} />
            ))}
            {isPending && (
              <Bubble role="assistant" content={null} responseLoading={true} />
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input — fixed at bottom, never shrinks */}
      <div className="shrink-0">
        <MessageInput sendMessage={sendMessage} isPending={isPending} />
      </div>
    </div>
  );
}
