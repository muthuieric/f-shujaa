import Image from "next/image";

import ContactButton from "@/app/components/ContactButton";
import CourseList from "@/app/components/courses/CourseList";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const InstructorDetailPage = async ({ params }: { params: { id: string }}) => {
    const instructor = await apiService.get(`/api/auth/${params.id}`); // API call updated to fetch instructor
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image
                            src={instructor.avatar_url}  // Updated to instructor data
                            width={200}
                            height={200}
                            alt="Instructor name"  // Updated alt text
                            className="rounded-full"
                        />

                        <h1 className="mt-6 text-2xl">{instructor.name}</h1>  {/* Updated to instructor name */}

                        {userId !== params.id && (
                            <ContactButton 
                                userId={userId}
                                instructorId={params.id}  // Updated to instructorId
                            />
                        )}
                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <CourseList  // Updated to use CourseList instead of PropertyList
                            instructor_id={params.id}  // Updated to instructor_id
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default InstructorDetailPage;
