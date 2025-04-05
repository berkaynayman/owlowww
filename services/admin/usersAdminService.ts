// lib/usersAdminService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/admin/users'; // adjust as needed

const headers = () => ({
   // Authorization: `Bearer ${token}`,
});

export const usersAdminService = {
    findAllTeam: async (token: string) => {
        const res = await axios.get(`${API_BASE}/team`, { headers: headers() });
        return res.data;
    },

    findAllUsers: async (token: string) => {
        const res = await axios.get(`${API_BASE}/users`, { headers: headers() });
        return res.data;
    },

    findOne: async (id: string, token: string) => {
        const res = await axios.get(`${API_BASE}/${id}`, { headers: headers() });
        return res.data;
    },

    signup: async (data: any, tenantId: string, token: string) => {
        const res = await axios.post(
            `${API_BASE}/signup`,
            data,
            {
                headers: {
                    ...headers(token)
                },
            }
        );
        return res.data;
    },

    update: async (id: string, data: any, token: string) => {
        const res = await axios.post(`${API_BASE}/${id}`, data, { headers: headers() });
        return res.data;
    },

    disable: async (id: string, token: string) => {
        const res = await axios.delete(`${API_BASE}/${id}`, { headers: headers() });
        return res.data;
    },

    uploadAvatar: async (id: string, file: File, tenantId: string, token: string) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await axios.post(`${API_BASE}/${id}/avatar`, formData, {
            headers: {
                ...headers(token)
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    },
};
