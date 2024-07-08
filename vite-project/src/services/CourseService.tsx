import axios from 'axios';

const API_URL = 'http://localhost:8090/courses';

axios.defaults.withCredentials = true;

export const getAllCourses = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createCourse = async (course: { name: string }) => {
    const response = await axios.post(API_URL, course);
    return response.data;
};

export const deleteCourse = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};
