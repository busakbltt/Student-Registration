import axios from "axios";

const API_URL = 'http://localhost:8090/students';

axios.defaults.withCredentials = true;

export const getAllStudents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getStudentById = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createStudent = async (student: { name: string, email: string}) => {
    const response = await axios.post(API_URL, student);
    return response.data;
};

export const deleteStudent = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};