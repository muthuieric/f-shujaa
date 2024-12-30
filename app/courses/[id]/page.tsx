import Image from "next/image";
import Link from "next/link";
import EnrollmentSidebar from "@/app/components/courses/EnrollementSidebar";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const CourseDetailPage = async ({ params }: { params: { id: string } }) => {
    const course = await apiService.get(`/api/courses/${params.id}`);
    const userId = await getUserId();

    console.log('userId', userId);

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={course.image_url}
                    className="object-cover w-full h-full"
                    alt="Course image"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{course.title}</h1>

                    <hr />
                    
                    <Link 
                        href={`/instructors/${course.instructor.id}`}  // Adjusted to "instructors"
                        className="py-6 flex items-center space-x-4"
                    >
                        {course.instructor.avatar_url && (
                            <Image
                                src={course.instructor.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="Instructor name"
                            />
                        )}

                        <p><strong>{course.instructor.name}</strong> is the instructor</p>  
                    </Link>

                    <hr />

                    <p className="mt-6 text-lg">
                        {course.description}
                    </p>
                </div>

                <EnrollmentSidebar 
                    course={course}  
                    userId={userId}
                />
            </div>
        </main>
    )
}

export default CourseDetailPage;
