// lib/thumbnailService.ts

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/admin/thumbnails';

const headers = () => ({
    // Authorization: `Bearer ${token}`,
});

export const thumbnailAdminService = {
    // Upload thumbnail (multipart/form-data)
    uploadThumbnail: async (
        file: File,
        type: 'course' | 'module' | 'entity',
        id: string,
        token: string
    ) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await axios.post(`${API_BASE}/thumbnail`, formData, {
            headers: {
                ...headers(),
                'Content-Type': 'multipart/form-data',
            },
            params: { type, id },
        });

        return res.data; // { success: true, imageUrl }
    },

    // Get a secure image stream URL (used to display in <img />)
    getStreamUrl: (type: 'course' | 'module' | 'entity', id: string): string => {
        return `${API_BASE}/${type}/${id}`;
    },
};
