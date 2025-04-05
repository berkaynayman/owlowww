// lib/accessInformationAdminService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/admin/courses/access-information';

const headers = () => ({
    //  Authorization: `Bearer ${token}`,
});

export const accessInformationAdminService = {
    // Create a new access information entry
    create: async (data: any) => {
        const res = await axios.post(`${API_BASE}/create`, data, {
            headers: {
                ...headers(token)
            },
        });
        return res.data;
    },

    // Assign courses to an access info entry
    assignCourses: async (accessId: string, courseIds: string[]) => {
        const res = await axios.post(`${API_BASE}/${accessId}/add-courses`, {courseIds}, {
            headers: {
                ...headers(token)
            },
        });
        return res.data;
    },

    // Assign users to an access info entry
    assignUsers: async (accessId: string, userIds: string[]) => {
        const res = await axios.post(`${API_BASE}/${accessId}/grant-user-access`, {userIds}, {
            headers: {
                ...headers(token)
            },
        });
        return res.data;
    },

    // Get all access information entries
    findAll: async () => {
        const res = await axios.get(`${API_BASE}`, {
            headers: headers(),
        });
        return res.data;
    },

    // Get one entry by ID
    findOne: async (id: string) => {
        const res = await axios.get(`${API_BASE}/${id}`, {
            headers: headers(),
        });
        return res.data;
    },

    // Revoke user access from a specific access entry
    revokeUserAccess: async (accessId: string, userId: string) => {
        const res = await axios.delete(`${API_BASE}/${accessId}/users/${userId}`, {
            headers: headers(),
        });
        return res.data;
    },

    // Delete access information entry
    deleteAccessInformation: async (accessId: string) => {
        const res = await axios.delete(`${API_BASE}/${accessId}`, {
            headers: headers(),
        });
        return res.data;
    },
};
