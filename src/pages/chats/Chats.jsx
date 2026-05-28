import ChatHeader from "../../components/chats/ChatHeader";
import ConversationCard from "../../components/chats/ConversationCard";
import MessageBubble from "../../components/chats/MessageBubble";
import MessageInput from "../../components/chats/MessageInput";
import EmptyIllustration from "../../components/ui/EmptyIllustration";
import emptyImg from "../../assets/no-conv.svg";


import { useState } from "react";

export default function Chats(){
    return (
        <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
            <ChatHeader />
            <ConversationCard />

            <EmptyIllustration
            imageSrc={emptyImg}
            title={"لا توجد محادثات بعد"}
            description={"ابدأ محادثة جديدة مع أحد الأصدقاء أو الزملاء!"}
             />
        </div>
    );
}