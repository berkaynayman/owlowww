// lib/coursesAdminService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/admin/courses';

const headers = () => ({
   // Authorization: `Bearer ${token}`,
});

export const coursesAdminService = {
    findAll: async (token: string, withTree: boolean = false) => {
        const res = await axios.get(`${API_BASE}`, {
            headers: headers(),
            params: { withTree },
        });
        return res.data;
    },

    findOne: async (id: string, token: string, withTree: boolean = false) => {
        const res = await axios.get(`${API_BASE}/${id}`, {
            headers: headers(),
            params: { withTree },
        });
        return res.data;
    },

    create: async (data: any, tenantId: string, token: string) => {
        const res = await axios.put(`${API_BASE}`, data, {
            headers: {
                ...headers()
            },
        });
        return res.data;
    },

    update: async (id: string, data: any, token: string) => {
        const res = await axios.post(`${API_BASE}/${id}`, data, {
            headers: headers(),
        });
        return res.data;
    },

    remove: async (id: string, token: string) => {
        const res = await axios.delete(`${API_BASE}/${id}`, {
            headers: headers(),
        });
        return res.data;
    },
};
