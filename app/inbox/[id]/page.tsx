'use client';

import React, { useState, useEffect } from 'react';
import { getUserId, getAccessToken } from '../../lib/actions';
import apiService from '@/app/services/apiService';
import ConversationDetail from '@/app/components/inbox/ConversationDetail';

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
};

export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
};

export type ConversationType = {
    id: string;
    users: UserType[];
    messages: MessageType[];  // Add this line to reflect messages

};

interface ConversationPageProps {
    params: { id: string };
}

const ConversationPage: React.FC<ConversationPageProps> = ({ params }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [conversation, setConversation] = useState<ConversationType | null>(null);

    // Unwrap the params object using React.use() to access params.id
    const { id } = React.use(params);

    useEffect(() => {
        const fetchData = async () => {
            const userId = await getUserId();
            const authToken = await getAccessToken();
            if (!userId || !authToken) {
                return;
            }
            setUserId(userId);
            setToken(authToken);

            try {
                const conversationData = await apiService.get(`/api/chat/${id}/`);
                setConversation(conversationData);
            } catch (error) {
                console.error('Error fetching conversation data:', error);
            }
        };

        fetchData();
    }, [id]); // Ensure `id` is used as the dependency

    if (!conversation || !token || !userId) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p>No conversation or user data found. Please log in.</p>
            </main>
        );
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail
                token={token}
                userId={userId}
                messages={conversation.messages}
                conversation={conversation}
            />
        </main>
    );
};

export default ConversationPage;
