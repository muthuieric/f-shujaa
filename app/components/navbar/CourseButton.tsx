'use client';

import { useRouter } from 'next/navigation';

const CourseButton: React.FC = () => { // React.FC with no props
    const router = useRouter(); // Initialize the router

    const handleCourse = () => {
        router.push('/course'); // Navigate to the courses page
    }

    return (
        <div 
            onClick={handleCourse} 
            className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
        >
            Course
        </div>
    );
}

export default CourseButton;
