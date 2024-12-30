import CourseList from "../components/courses/CourseList";
import { getUserId } from "../lib/actions"; // Function to get the user ID

const MyFavoritesPage = async () => {
    const userId = await getUserId(); // Fetch the user ID asynchronously

    // If user is not authenticated, show a message
    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        );
    }

    // If authenticated, render the favorites page
    return (
        <main className="max-w-[1500px] max-auto px-6 pb-12">
            <h1 className="my-6 text-2xl">My Favorite Courses</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Adjusted to render courses instead of properties */}
                <CourseList 
                    favorites={true} // Pass the favorites flag for the course list
                />
            </div>
        </main>
    );
};

export default MyFavoritesPage;
