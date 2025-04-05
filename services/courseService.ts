import { Course, CourseEntity, CourseModule } from "@/types/Course";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3999/api/v1";

const handleResponse = async (res: Response) => {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || "Request failed");
    }
    return res.json();
};

export const getCourses = async (withTree: boolean = false): Promise<Course[]> => {
    const res = await fetch(`${API_BASE_URL}/me/courses/?withTree=${withTree}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60, // cache für 60 Sekunden
        },
    });
    return handleResponse(res);
};

export const getCourse = async (id: string): Promise<Course> => {
    const res = await fetch(`${API_BASE_URL}/me/courses/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return handleResponse(res);
};

export const getCourseModule = async (moduleId: string): Promise<CourseModule> => {
    const res = await fetch(`${API_BASE_URL}/me/courses/modules/${moduleId}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return handleResponse(res);
};

export const getCourseEntity = async (entityId: string): Promise<CourseEntity> => {
    const res = await fetch(`${API_BASE_URL}/me/courses/entities/${entityId}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return handleResponse(res);
};
