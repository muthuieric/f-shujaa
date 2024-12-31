import Image from 'next/image';
import Link from 'next/link';

import UserNav from './UserNav';
import { getUserId } from '@/app/lib/actions';
import AddCourseButton from './AddCourseButton';
import CourseButton from './CourseButton';

const Navbar = async () => {
    const userId = await getUserId();

    console.log('userId:', userId);

    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <p className="text-gray-800 font-bold text-4xl ">
                        F-<span className="text-shujaa hover:text-shujaa-dark">Shujaa</span>
                        </p>
                    </Link>

                   
                    <div className="flex items-center space-x-6">

                        <CourseButton /> 

                        <AddCourseButton 
                            userId={userId}
                        />

                        <UserNav 
                            userId={userId}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
