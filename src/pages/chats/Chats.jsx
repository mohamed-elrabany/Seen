import ChatHeader from "../../components/chats/ChatHeader";
import ConversationCard from "../../components/chats/ConversationCard";
import MessageBubble from "../../components/chats/MessageBubble";
import MessageInput from "../../components/chats/MessageInput";
import EmptyIllustration from "../../components/ui/EmptyIllustration";
import emptyImg from "../../assets/no-conv.svg";


import { useState } from "react";
import { useConversations } from "../../hooks/chats/useConversations";
import { useTranslation } from "react-i18next";

export default function Chats(){
    const { data, isLoading } = useConversations();
    const {t} = useTranslation();
    console.log("Conversations Data:", data);

    return (
        <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
            <ChatHeader />
            {data?.conversations.length > 0 ?
             data.conversations.map((conv) => (
                <ConversationCard key={conv.id} cardData={conv} />
            ))
            :
            <EmptyIllustration
            imageSrc={emptyImg}
            title={t("chats.empty.conv.title")}
            description={t("chats.empty.conv.description")}
             />
            }

            
        </div>
    );
}