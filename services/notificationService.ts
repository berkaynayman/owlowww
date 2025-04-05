// lib/notificationService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const headers = () => ({
//    Authorization: `Bearer ${token}`,
});

export const notificationService = {
    // Get user's notification preferences
    getPreferences: async () => {
        const res = await axios.get(`${API_BASE}/me/notifications/preferences`, {
            headers: headers(),
        });
        return res.data;
    },

    // Update user's notification preference
    updatePreference: async (data: any, token: string) => {
        const res = await axios.post(`${API_BASE}/me/notifications/preferences`, data, {
            headers: headers(),
        });
        return res.data;
    },
};
