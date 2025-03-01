'use client';

import { useRouter } from 'next/navigation';
import useLoginModal from "@/app/hooks/useLoginModal";


interface InstructorButtonProps {
    userId: string | null; // Define the prop type
}

const InstructorButton: React.FC<InstructorButtonProps> = ({
     userId 
    }) => {
        const loginModal = useLoginModal();
        const router = useRouter();

    
   
    const handleInstructor = () => {
        if (!userId) {
            loginModal.open();
        } else {
            router.push('/instructor');
        }
    };

    return (
        <div
            onClick={handleInstructor}
            className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
        >
            Instructor
        </div>
    );
};

export default InstructorButton;