// lib/tenantAdminService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const headers = () => ({
    // Authorization: `Bearer ${token}`,
});

export const tenantAdminService = {
    // Create a new tenant
    create: async (data: any) => {
        const res = await axios.post(
            `${API_BASE}/admin/tenants`,
            data,
            {
                headers: {
                    ...headers()
                },
            }
        );
        return res.data;
    },

    // Update an existing tenant
    update: async (id: string, data: any) => {
        const res = await axios.put(
            `${API_BASE}/admin/tenants/${id}`,
            data,
            {
                headers: headers(),
            }
        );
        return res.data;
    },

    // Delete a tenant
    delete: async (id: string) => {
        const res = await axios.delete(`${API_BASE}/admin/tenants/${id}`, {
            headers: headers(),
        });
        return res.data;
    },
};
