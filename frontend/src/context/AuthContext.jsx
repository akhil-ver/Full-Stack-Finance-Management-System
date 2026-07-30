import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const { data } = await API.post('/auth/login', credentials);
            localStorage.setItem('token', data.token);
            const userData = { name: data.name, email: data.email, role: data.role };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            toast.success('Logged in successfully!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await API.post('/auth/register', userData);
            localStorage.setItem('token', data.token);
            const storedUser = { name: data.name, email: data.email, role: data.role };
            localStorage.setItem('user', JSON.stringify(storedUser));
            setUser(storedUser);
            toast.success('Registration successful!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.info('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
