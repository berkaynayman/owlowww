// lib/courseModulesAdminService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const headers = () => ({
    //Authorization: `Bearer ${token}`,
});

export const courseModulesAdminService = {
    // Get all modules for a course
    findByCourse: async (courseId: string, token: string) => {
        const res = await axios.get(`${API_BASE}/admin/courses/${courseId}/modules`, {
            headers: headers(),
        });
        return res.data;
    },

    // Create a new module for a course
    create: async (courseId: string, data: any, tenantId: string, token: string) => {
        const res = await axios.put(
            `${API_BASE}/admin/courses/${courseId}/modules`,
            data,
            {
                headers: {
                    ...headers(token)
                },
            }
        );
        return res.data;
    },

    // Update a module by ID
    update: async (courseId: string, moduleId: number, data: any, token: string) => {
        const res = await axios.post(
            `${API_BASE}/admin/courses/${courseId}/modules/${moduleId}`,
            data,
            {
                headers: headers(),
            }
        );
        return res.data;
    },

    // Delete a module by ID
    delete: async (courseId: string, moduleId: number, token: string) => {
        const res = await axios.delete(
            `${API_BASE}/admin/courses/${courseId}/modules/${moduleId}`,
            {
                headers: headers(),
            }
        );
        return res.data;
    },
};
