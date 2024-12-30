'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseListItem from "./CourseListItem";
import apiService from '@/app/services/apiService';
import useSearchModal from '@/app/hooks/useSearchModal';

export type CourseType = {
    id: string;
    title: string;
    image_url: string;
    is_favorite: boolean;
}

interface CourseListProps {
    instructor_id?: string | null;
    favorites?: boolean | null;
}

const CourseList: React.FC<CourseListProps> = ({
    instructor_id,
    favorites
}) => {
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const category = searchModal.query.category;
    const [courses, setCourses] = useState<CourseType[]>([]);

    console.log('searchQuery:', searchModal.query);

    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpCourses = courses.map((course: CourseType) => {
            if (course.id === id) {
                course.is_favorite = is_favorite;

                if (is_favorite) {
                    console.log('Added to list of favorited courses');
                } else {
                    console.log('Removed from list');
                }
            }

            return course;
        });

        setCourses(tmpCourses);
    };

    const getCourses = async () => {
        let url = '/api/courses/';

        if (instructor_id) {
            url += `?instructor_id=${instructor_id}`;
        } else if (favorites) {
            url += '?is_favorites=true';
        } else {
            let urlQuery = '';

            if (category) {
                urlQuery += '&category=' + category;
            }

            if (urlQuery.length) {
                console.log('Query:', urlQuery);

                urlQuery = '?' + urlQuery.substring(1);

                url += urlQuery;
            }
        }

        const tmpCourses = await apiService.get(url);

        setCourses(tmpCourses.data.map((course: CourseType) => {
            course.is_favorite = tmpCourses.favorites.includes(course.id);
            return course;
        }));
    };

    useEffect(() => {
        getCourses();
    }, [category, searchModal.query, params]);

    return (
        <>
            {courses.map((course) => {
                return (
                    <CourseListItem 
                        key={course.id}
                        course={course}
                        markFavorite={(is_favorite: any) => markFavorite(course.id, is_favorite)}
                    />
                )
            })}
        </>
    );
}

export default CourseList;
