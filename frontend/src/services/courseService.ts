import { api } from "@/utils/axiosInstance";
import type {Course} from "@/types/course";
 const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
 export const addCourseApi = async (course: Course) => {
    try{
     await api.post(`${BACKEND_BASE_URL}/course`, course)
    }
    catch(error)
    {
        console.error("Error adding course:", error);
        throw error;
    }
 }

 export const getCoursesApi = async () => {
    try {
        const response = await api.get(`${BACKEND_BASE_URL}/course`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error; 
    }
 }

export const getCourseByIdApi = async (courseId: string) => {
    try {
        const response = await api.get(`${BACKEND_BASE_URL}/course/${courseId}`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching course by ID:", error);
        throw error; 
    }
 }

export const updateCourseApi = async (courseId: string, course: Course) => {
    try {
        await api.put(`${BACKEND_BASE_URL}/course/${courseId}`, course);
    } catch (error) {
        console.error("Error updating course:", error);
        throw error; 
    }
}

export const deleteCourseApi = async (courseId: string) => {
    try {
        await api.delete(`${BACKEND_BASE_URL}/course/${courseId}`);
    } catch (error) {
        console.error("Error deleting course:", error);
        throw error; 
    }
}