import Image from "next/image";
import apiService from "../services/apiService";
import Link from "next/link";

const MyEnrollmentsPage = async () => {
    const enrollments = await apiService.get('/api/auth/myenrollments/')

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl">My Enrollments</h1>

            <div className="space-y-4">
                {enrollments.map((enrollment: any) => {
                    return (              
                        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                            <div className="col-span-1">
                                <div className="relative overflow-hidden aspect-square rounded-xl">
                                    <Image
                                        fill
                                        src={enrollment.course.image_url}
                                        className="hover:scale-110 object-cover transition h-full w-full"
                                        alt="Course image"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-3">
                                <h2 className="mb-4 text-xl">{enrollment.course.title}</h2>

                                <Link 
                                    href={`/courses/${enrollment.course.id}`}
                                    className="mt-6 inline-block cursor-pointer py-4 px-6 bg-shujaa text-white rounded-xl"
                                >
                                    Go to course
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default MyEnrollmentsPage;
