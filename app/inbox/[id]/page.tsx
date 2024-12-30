'use client'; // Mark the component as a Client Component

import React, { useState, useEffect } from "react";
import { getUserId, getAccessToken } from "../../lib/actions";
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";

const ConversationPage = ({ params }: { params: { id: string } }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [conversation, setConversation] = useState<any>(null); // Adjust the type as per your API response

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserId();
            const authToken = await getAccessToken();
            setUserId(user);
            setToken(authToken);

            if (user && authToken) {
                const conversationData = await apiService.get(`/api/chat/${params.id}/`);
                setConversation(conversationData);
            }
        };

        fetchData();
    }, [params.id]);

    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        );
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            {conversation && (
                <ConversationDetail
                    token={token}
                    userId={userId}
                    messages={conversation.messages}
                    conversation={conversation.conversation}
                />
            )}
        </main>
    );
};

export default ConversationPage;
