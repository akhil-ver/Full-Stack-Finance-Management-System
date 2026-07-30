import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Welcome to FinanceApp!', time: new Date(), read: false }
    ]);

    const addNotification = (message) => {
        setNotifications(prev => [
            { id: Date.now(), message, time: new Date(), read: false },
            ...prev
        ].slice(0, 10)); // Keep only latest 10 notifications
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markAllRead, unreadCount }}>
            {children}
        </NotificationContext.Provider>
    );
};
