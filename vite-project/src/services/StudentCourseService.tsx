import axios from "axios";

interface Course {
    id: number;
    name: string;
}

interface Student {
    id: number;
    name: string;
    email: string;
    courses: Course[];
}

export const addCoruseToStudent = async (studentId: number, courseId: number) => {
    const response =await axios.post<Student>(`http://localhost:8090/students/${studentId}/courses`, {courseId});
    return response.data;
};

export const removeCourseFromStudent = async (studentId: number, courseId: number) => {
    const response = await axios.delete<Student>(`http://localhost:8090/students(${studentId}/courses{${courseId}`);
    return response.data;
};