'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser } from '@/services/auth';
import { systemNotificationService } from '@/services/systemNotificationService';

export interface User {
    id: string;
    email: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    city?: string;
    position?: string;
    bio?: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    // Extend as needed
}

interface AuthContextProps {
    user: User | null;
    notifications: Notification[] | null;
    refreshNotifications: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    notifications: null,
    refreshNotifications: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [notifications, setNotifications] = useState<Notification[] | null>(null);

    // Fetch user info
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setUser(user);
            } catch {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    // Fetch notifications
    const loadNotifications = async () => {
        try {
            const token = localStorage.getItem('access_token'); // Or from cookie/context depending on how you store it
            if (!token) return;

            const notifs = await systemNotificationService.getNotifications(10, true);
            setNotifications(notifs);
        } catch (err) {
            console.error('Failed to load notifications:', err);
            setNotifications(null);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    return (
        <AuthContext.Provider value={{ user, notifications, refreshNotifications: loadNotifications }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
