// lib/webhookService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const headers = () => ({
    //  Authorization: `Bearer ${token}`,
});

export const webhookAdminService = {
    // Create a webhook subscription
    create: async (data: any, tenantId: string, token: string) => {
        const res = await axios.post(`${API_BASE}/webhooks`, data, {
            headers: {
                ...headers()
            },
        });
        return res.data;
    },

    // Get all webhook subscriptions
    findAll: async (token: string) => {
        const res = await axios.get(`${API_BASE}/webhooks`, {
            headers: headers(),
        });
        return res.data;
    },

    // Get a specific webhook by ID
    findOne: async (id: string, token: string) => {
        const res = await axios.get(`${API_BASE}/webhooks/${id}`, {
            headers: headers(),
        });
        return res.data;
    },

    // Update a webhook subscription
    update: async (id: string, data: any, token: string) => {
        const res = await axios.put(`${API_BASE}/webhooks/${id}`, data, {
            headers: headers(),
        });
        return res.data;
    },

    // Delete a webhook subscription
    delete: async (id: string, token: string) => {
        const res = await axios.delete(`${API_BASE}/webhooks/${id}`, {
            headers: headers(),
        });
        return res.data;
    },
};
