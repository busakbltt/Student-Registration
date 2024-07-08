import { useEffect, useState } from "react";
import axios from "axios";

interface Student {
    id: number;
    name: string;
    email: string;
    courses: Course[];
}

interface Course {
    id: number;
    name: string;
}

interface StudentListProps {
    refresh: boolean;
}

const StudentList: React.FC<StudentListProps> = ({refresh}) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<{ [studentId: number]: number | null}>({});

    useEffect(()=> {
        const fetchStudents = async () => {
            try {
                const response = await axios.get<Student[]>('http://localhost:8090/students');
                setStudents(response.data);
            } catch (error) {
                console.error("There was an error fetching the students", error);
            }
        };

        const fetchCourses = async () => {
            try {
                const response = await axios.get<Course[]>('http://localhost:8090/courses');
                setCourses(response.data);
            } catch (error) {
                console.error("There was an error fetching the courses!", error);
            }
        };  
        fetchStudents();
        fetchCourses();
    }, [refresh]);

    // const express = require('express');
    // const cors = require('cors');
    // const app = express();

    // app.use(cors({
    //     origin: 'http://localhost:5173',
    //     credentials: true
    // }));
    
    const handleAddCourseToStudent = async (studentId: number) => {
        const courseId = selectedCourses[studentId];
        if (courseId) {
            try {
                const response = await axios.post<Student>(`http://localhost:8090/students/${studentId}/courses/${courseId}`, {}, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                setStudents(students.map(student => student.id === studentId ? response.data : student));
                setSelectedCourses({ ...selectedCourses, [studentId]: null});
            } catch (error) {
                console.error("There was an error adding the course to the student!", error);
            }
        }
    };

    const handleRemoveCourseFromStudent = async (studentId: number, courseId: number) => {
        try {
            const response = await axios.delete<Student>(`http://localhost:8090/students/${studentId}/courses/${courseId}`, {
                withCredentials: true
            });
            setStudents(students.map(student => student.id === studentId ? response.data : student));
        } catch (error) {
            console.error("There was an error removing the course from the student!", error);
        }
    };

    const handleCourseChange = (studentId: number, courseId: number) => {
        setSelectedCourses({ ...selectedCourses, [studentId]: courseId});
    };

    // useEffect(() => {
    //     fetchStudents();
    //     fetchCourses();
    // }, [refresh]);

    return (
        <div>
            <h1>Student List</h1>
            
                {students.map(student => (
                    <div key={student.id}>
                        <p>{student.name} - {student.email}</p>
                        <select value={selectedCourses[student.id] || ''} onChange={(e) => handleCourseChange(student.id, Number(e.target.value))}>
                            <option value="">Select a course</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.name}</option>
                            ))}
                        </select>
                        <button onClick={() => handleAddCourseToStudent(student.id)}>Add Course</button>
                        {student.courses.map(course => (
                            <div key={course.id}>
                                {course.name} <button onClick={() => handleRemoveCourseFromStudent(student.id, course.id)}>Remove Course</button>
                            </div>
                        ))}
                    </div>
                    // <li key={student.id}>
                    //     {student.name} - {student.email}
                    //     <ul>
                    //         {student.courses.map(course => (
                    //             <li key={course.id}>
                    //                 {course.name}
                    //                 <button onClick={() => handleRemoveCourseFromStudent(student.id, course.id)}>Remove</button>
                    //             </li>
                    //         ))}
                    //     </ul>
                    //     <select onChange={(e) => handleCourseChange(student.id, Number(e.target.value))} value={selectedCourses[student.id] || ''}>
                    //         <option value="">Select a course</option>
                    //         {courses.map(course => (
                    //             <option key={course.id} value={course.id}>{course.name}</option>
                    //         ))}
                    //     </select>
                    //     <button onClick={() => handleAddCourseToStudent(student.id)}>Add Course</button>
                    // </li>
                ))}
            
        </div>
    );
};

export default StudentList;