'use client';

import { useState, useEffect } from 'react';
import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation'; // Correct for Next.js 13+ with App Router

export type Course = {
    id: string;
};

interface EnrollmentSidebarProps {
    userId: string | null;
    course: Course;
}

const EnrollmentSidebar: React.FC<EnrollmentSidebarProps> = ({ course, userId }) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const [enrollments, setEnrollments] = useState<any[]>([]);

    // Fetch enrollments for the course
    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await apiService.get(`/api/courses/${course.id}/enrollments/`);
                setEnrollments(response);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
            }
        };

        fetchEnrollments();
    }, [course.id]);

    const performEnrollment = async () => {
        if (!userId) {
            loginModal.open();
            return;
        }

        try {
            const response = await apiService.post(`/api/courses/${course.id}/enroll/`, {});
            if (response.success) {
                console.log('Enrollment successful');
                setEnrollments((prev) => [...prev, response.enrollment]); // Add new enrollment to the list
            } else {
                console.error('Enrollment failed:', response.detail);
            }
        } catch (error) {
            console.error('Error during enrollment:', error);
        }
    };

    const handleNavigation = () => {
        if (userId) {
            router.push('/excel');
        } else {
            loginModal.open();
        }
    };

    return (
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <div className="mb-6">
                <h3 className="text-xl font-bold">Enrolled Participants:</h3>
                {enrollments.length > 0 ? (
                   <ul>
                   {enrollments.map((enrollment) => (
                       <li key={enrollment.id || enrollment.course.id || Math.random()}>
                           {enrollment.course.title}
                       </li>
                   ))}
               </ul>
               
                ) : (
                    <p>No enrollments yet.</p>
                )}
            </div>

            <div
                onClick={performEnrollment}
                className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl"
            >
                Enroll
            </div>

            <div
                onClick={handleNavigation}
                className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl"
            >
                Start
            </div>

            <hr />
        </aside>
    );
};

export default EnrollmentSidebar;
