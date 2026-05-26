import ChatHeader from "../../components/chats/ChatHeader";
import ConversationCard from "../../components/chats/ConversationCard";
import MessageBubble from "../../components/chats/MessageBubble";
import MessageInput from "../../components/chats/MessageInput";

import emptyImg from "../../assets/no-conv.svg";
import EmptyIllustration from "../../components/ui/EmptyIllustration";

import { useState } from "react";

export default function Chats(){
    return (
        <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
            <ChatHeader />
            <ConversationCard />

            {/* <MessageBubble 
            isRead={true}
            message={"Hello, how are you?"}
            isOwnMessage={true} />
            <MessageBubble 
            isRead={false}
            message={"I'm doing great, thanks for asking!"}
            isOwnMessage={false} /> */}
            

            <EmptyIllustration
            imageSrc={emptyImg}
            title={"لا توجد محادثات بعد"}
            description={"ابدأ محادثة جديدة مع أحد الأصدقاء أو الزملاء!"}
             />
        </div>
    );
}