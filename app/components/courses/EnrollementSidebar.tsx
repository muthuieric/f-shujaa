'use client';

import { useState, useEffect } from 'react';
import { Range } from 'react-date-range';
import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation'; // Correct for Next.js 13+ with App Router

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

export type Course = {
    id: string;
    seats: number;
    price_per_day: number;
}

interface EnrollmentSidebarProps {
    userId: string | null,
    course: Course
}

const EnrollmentSidebar: React.FC<EnrollmentSidebarProps> = ({
    course,
    userId
}) => {
    const loginModal = useLoginModal();
    const router = useRouter(); // Initialize router here

    const [fee, setFee] = useState<number>(0);
    const [days, setDays] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [bookedDates, setBookedDates] = useState<Date[]>([]);
    const [participants, setParticipants] = useState<string>('1');
    const participantsRange = Array.from({ length: course.seats }, (_, index) => index + 1)

    const performEnrollment = async () => {
        console.log('performEnrollment', userId);

        if (userId) {
            if (dateRange.startDate && dateRange.endDate) {
                const formData = new FormData();
                formData.append('participants', participants);
                formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
                formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
                formData.append('number_of_days', days.toString());
                formData.append('total_price', totalPrice.toString());

                const response = await apiService.post(`/api/courses/${course.id}/enroll/`, formData);

                if (response.success) {
                    console.log('Enrollment successful');
                } else {
                    console.log('Something went wrong...');
                }
            }
        } else {
            loginModal.open();
        }
    }

    const getEnrollments = async () => {
        const enrollments = await apiService.get(`/api/courses/${course.id}/enrollments/`)

        let dates: Date[] = [];

        enrollments.forEach((enrollment: any) => {
            const range = eachDayOfInterval({
                start: new Date(enrollment.start_date),
                end: new Date(enrollment.end_date)
            });

            dates = [...dates, ...range];
        })

        setBookedDates(dates);
    }

    useEffect(() => {
        getEnrollments();

        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && course.price_per_day) {
                const _fee = ((dayCount * course.price_per_day) / 100) * 5;

                setFee(_fee);
                setTotalPrice((dayCount * course.price_per_day) + _fee);
                setDays(dayCount);
            } else {
                const _fee = (course.price_per_day / 100) * 5;

                setFee(_fee);
                setTotalPrice(course.price_per_day + _fee);
                setDays(1);
            }
        }
    }, [dateRange])

    const handleNavigation = () => {
        if (userId) {
            // Navigate to the next page if authenticated
            router.push('/excel');
        } else {
            // Open the login modal if not authenticated
            loginModal.open();
        }
    };

    return (
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">

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
    )
}

export default EnrollmentSidebar;
