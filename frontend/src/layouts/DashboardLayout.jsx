import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
    const { user, loading } = useContext(AuthContext);
    const { isGreyTheme } = useContext(ThemeContext);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    
    if (!user) return <Navigate to="/login" />;

    return (
        <div className={`flex h-screen transition-colors duration-300 ${isGreyTheme ? 'bg-gray-200' : 'bg-gray-50'}`}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className={`flex-1 overflow-x-hidden overflow-y-auto p-6 transition-colors duration-300 ${isGreyTheme ? 'bg-gray-200' : 'bg-gray-50'}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
