import Image from "next/image";
import { CourseType } from "./CourseList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface CourseProps {
    course: CourseType;
    markFavorite?: (is_favorite: boolean) => void;
}

const CourseListItem: React.FC<CourseProps> = ({
    course,
    markFavorite
}) => {
    const router = useRouter();

    return (
        <div 
            className="cursor-pointer"
            onClick={() => router.push(`/courses/${course.id}`)}
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={course.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Course thumbnail"
                />

                {markFavorite && (
                    <FavoriteButton
                        id={course.id}
                        is_favorite={course.is_favorite}
                        markFavorite={(is_favorite) => markFavorite(is_favorite)}
                    />
                )}
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">{course.title}</p>
            </div>
        </div>
    );
}

export default CourseListItem;
