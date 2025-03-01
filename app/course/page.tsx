import Categories from "../components/Categories";
import CourseList from "../components/courses/CourseList";

export default function Course() {
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <Categories />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <CourseList />  
      </div>
    </main>
  );
}
