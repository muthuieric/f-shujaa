import { getUserId } from "../lib/actions";
import CourseList from "../components/courses/CourseList";

const MyCoursesPage = async () => {
    const userId = await getUserId(); // Fetch the logged-in user's ID

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl">My Courses</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CourseList 
                    instructor_id={userId} // Pass the userId as the instructor_id
                />
            </div>
        </main>
    );
}

export default MyCoursesPage;
