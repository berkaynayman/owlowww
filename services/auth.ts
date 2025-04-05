import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3999/api/v1';

export async function login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, { email, password }, {
        withCredentials: true,
        credentials: 'include', // 👈 required to send cookies
    });
    return response.data;
}

export async function logout() {
    const response = await axios.post(`${API_BASE_URL}/auth/logout/`, {}, {
        withCredentials: true,
        credentials: 'include', // 👈 required to send cookies
    });
    return response.data;
}

export async function passwordResetRequest(email: string) {
    const response = await axios.post(`${API_BASE_URL}/public/selfservice/lost-password`, {
        email,
    });
    return response.data;
}

export async function resetPassword(email: string, token: string) {
    const response = await axios.post(`${API_BASE_URL}/public/selfservice/reset-password`, {
        email,
        token,
    });
    return response.data;
}

export async function getCurrentUser() {
    const response = await axios.get(`${API_BASE_URL}/me`, {
        withCredentials: true,
        credentials: 'include', // 👈 required to send cookies
    });
    return response.data;
}

export async function sendMagicLink(email: string) {
    const response = await axios.post(`${API_BASE_URL}/public/selfservice/magiclink`, { email });
    return response.data;
}
