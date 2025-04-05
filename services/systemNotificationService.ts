// lib/systemNotificationService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const headers = () => ({
    //Authorization: `Bearer ${token}`,
});

export const systemNotificationService = {
    // Get notifications (optionally limit and unreadOnly)
    getNotifications: async (
        limit?: number,
        unreadOnly?: boolean
    ) => {
        const res = await axios.get(`${API_BASE}/me/system-notifications`, {
            headers: headers(),
            params: {
                ...(limit !== undefined && {limit}),
                ...(unreadOnly !== undefined && {unreadOnly}),
            },
        });
        return res.data;
    },

    // Mark a single notification as read
    markAsRead: async (id: string, token: string) => {
        const res = await axios.post(
            `${API_BASE}/me/system-notifications/${id}/read`,
            {},
            {
                headers: headers(),
            }
        );
        return res.data;
    },

    // Mark all notifications as read
    markAllAsRead: async (token: string) => {
        const res = await axios.post(
            `${API_BASE}/me/system-notifications/read-all`,
            {},
            {
                headers: headers(),
            }
        );
        return res.data;
    },
};
