// lib/courseModuleGroupsAdminService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const headers = () => ({
  //  Authorization: `Bearer ${token}`,
});

export const courseModuleGroupsAdminService = {
    // Get all groups in a module
    find: async (moduleId: string, token: string) => {
        const res = await axios.get(`${API_BASE}/admin/courses/modules/${moduleId}/groups`, {
            headers: headers(),
        });
        return res.data;
    },

    // Create a new group inside a module
    create: async (moduleId: string, data: any, tenantId: string, token: string) => {
        const res = await axios.put(
            `${API_BASE}/admin/courses/modules/${moduleId}/groups`,
            data,
            {
                headers: {
                    ...headers()
                },
            }
        );
        return res.data;
    },

    // Update an existing group
    update: async (moduleId: string, groupId: number, data: any, token: string) => {
        const res = await axios.post(
            `${API_BASE}/admin/courses/modules/${moduleId}/groups/${groupId}`,
            data,
            {
                headers: headers(),
            }
        );
        return res.data;
    },

    // Delete a group
    delete: async (moduleId: string, groupId: number, token: string) => {
        const res = await axios.delete(
            `${API_BASE}/admin/courses/modules/${moduleId}/groups/${groupId}`,
            {
                headers: headers(),
            }
        );
        return res.data;
    },
};
