import { isPending } from "@reduxjs/toolkit";
import { useRef, useEffect } from "react";

export const useChatScroll = (messages) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.length, isPending]);

  return { containerRef, bottomRef };
};