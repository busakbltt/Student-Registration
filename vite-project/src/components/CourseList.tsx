import { useEffect, useState } from "react";
import { getAllCourses, createCourse, deleteCourse} from "../services/CourseService";

interface Course {
    id: number;
    name: string;
}

interface CourseListProps {
    refresh: boolean;
}

const CourseList: React.FC<CourseListProps> = ({ refresh }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [newCourseName, setNewCourseName] = useState<string>('');

    const fetchCourses = async () => {
        const courses = await getAllCourses();
        setCourses(courses);
    };

    const handleAddCourse = async () => {
        if (newCourseName.trim() !== '') {
            await createCourse({ name: newCourseName });
            fetchCourses();
            setNewCourseName('');
        }
    };

    const handleDeleteCourse = async (id: number) => {
        await deleteCourse(id);
        fetchCourses();
    };

    useEffect(() => {
        fetchCourses();
    }, [refresh]);

    return (
        <div>
            <h1>Course List</h1>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        {course.name}
                        <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input 
                type="text" 
                value={newCourseName} 
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="New Course Name" 
            />
            <button onClick={handleAddCourse}>Add Course</button>
        </div>
    );
};

export default CourseList;