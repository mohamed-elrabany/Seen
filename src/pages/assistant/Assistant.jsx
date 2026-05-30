import MessageInput from "../../components/assistant/MessageInput";
import Bubble from "../../components/assistant/Bubble";
import BotChatHeader from "../../components/assistant/BotHeader";
import { useState } from "react";

export default function Assistant() {
    const [data, setData] = useState({
        messages: []
    });
    return (
           <div className="flex flex-col h-screen w-full overflow-hidden">
             {/* Header — fixed at top, never shrinks */}
             <div className="shrink-0">
               <BotChatHeader />
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

             </div>
       
             {/* Input — fixed at bottom, never shrinks */}
             <div className="shrink-0">
               <MessageInput />
             </div>
           </div>
);
}