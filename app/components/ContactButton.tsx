'use client';

import useLoginModal from "../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import apiService from "../services/apiService";

interface ContactButtonProps {
    userId: string | null;
    instructorId: string; // Changed landlordId to instructorId
}

const ContactButton: React.FC<ContactButtonProps> = ({
    userId,
    instructorId // Changed landlordId to instructorId
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const startConversation = async () => {
        if (userId) {
            // API call updated to start a conversation with an instructor
            const conversation = await apiService.get(`/api/chat/start/${instructorId}/`);

            if (conversation.conversation_id) {
                router.push(`/inbox/${conversation.conversation_id}`);
            }
        } else {
            loginModal.open();
        }
    };

    return (
        <div 
            onClick={startConversation}
            className="mt-6 py-4 px-6 cursor-pointer bg-shujaa text-white rounded-xl hover:bg-shujaa-dark transition"
        >
            Contact
        </div>
    );
}

export default ContactButton;
