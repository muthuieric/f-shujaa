'use client';

import {useState, useEffect} from 'react';
import {Range} from 'react-date-range';
import { differenceInDays, eachDayOfInterval, format} from 'date-fns';
import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation'; // Correct for Next.js 13+ with App Router


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

export type Property ={
    id: string;
    guests: number;
    price_per_night: number;
}

interface ReservationSidebarProps {
    userId: string | null,
    property: Property
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
    property,
    userId
}) => {
    const loginModal = useLoginModal();
    const router = useRouter(); // Initialize router here


    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [bookedDates, setBookedDates] = useState<Date[]>([]);
    const [guests, setGuests] = useState<string>('1');
    const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1)

    const performBooking = async () => {
        console.log('performBooking', userId);

        if (userId) {
            if (dateRange.startDate && dateRange.endDate) {
                const formData = new FormData();
                formData.append('guests', guests);
                formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
                formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
                formData.append('number_of_nights', nights.toString());
                formData.append('total_price', totalPrice.toString());

                const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);

                if (response.success) {
                    console.log('Bookin successful')
                } else {
                    console.log('Something went wrong...');
                }
            }
        } else {
            loginModal.open();
        }
        
    }


   
    const getReservations = async () => {
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)

        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date)
            });

            dates = [...dates, ...range];
        })

        setBookedDates(dates);
    }

    useEffect(() => {
        getReservations();
        
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && property.price_per_night) {
                const _fee = ((dayCount * property.price_per_night) / 100) * 5;

                setFee(_fee);
                setTotalPrice((dayCount * property.price_per_night) + _fee);
                setNights(dayCount);
            } else {
                const _fee = (property.price_per_night / 100) * 5;

                setFee(_fee);
                setTotalPrice(property.price_per_night + _fee);
                setNights(1);
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
                onClick={performBooking}
                className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl"
            >
                Book
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

export default ReservationSidebar;