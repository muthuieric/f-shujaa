'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useAddCourseModal from "@/app/hooks/useAddCourseModal";

interface AddCourseButtonProps {
    userId?: string | null;
}

const AddCourseButton: React.FC<AddCourseButtonProps> = ({
    userId
}) => {
    const loginModal = useLoginModal();
    const addCourseModal = useAddCourseModal();

    const handleAddCourse = () => {
        if (userId) {
            addCourseModal.open();
        } else {
            loginModal.open();
        }
    }

    return (
        <div 
            onClick={handleAddCourse}
            className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
        >
            Add Course
        </div>
    );
}

export default AddCourseButton;
