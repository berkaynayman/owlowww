// lib/courseEntitiesAdminService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const headers = (token: string) => ({
    Authorization: `Bearer ${token}`,
});

export const courseEntitiesAdminService = {
    // Create a new entity inside a group
    create: async (groupId: number, data: any, tenantId: string, token: string) => {
        const res = await axios.put(
            `${API_BASE}/admin/courses/entities/${groupId}`,
            data,
            {
                headers: {
                    ...headers(token)
                },
            }
        );
        return res.data;
    },

    // Update an existing entity
    update: async (entityId: number, data: any, token: string) => {
        const res = await axios.post(
            `${API_BASE}/admin/courses/entities/${entityId}`,
            data,
            {
                headers: headers(token),
            }
        );
        return res.data;
    },

    // Delete an entity
    delete: async (entityId: number, token: string) => {
        const res = await axios.delete(
            `${API_BASE}/admin/courses/entities/${entityId}`,
            {
                headers: headers(token),
            }
        );
        return res.data;
    },
};
