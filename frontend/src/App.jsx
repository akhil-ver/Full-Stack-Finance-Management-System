import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { NotificationProvider, NotificationContext } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Investments from './pages/Investments';
import Goals from './pages/Goals';
import AdminPanel from './pages/AdminPanel';
import API from './services/api';

const AxiosInterceptor = ({ children }) => {
    const { addNotification } = React.useContext(NotificationContext);

    React.useEffect(() => {
        const interceptor = API.interceptors.response.use(
            (response) => {
                if (response.config.method !== 'get') {
                    if (response.config.url.includes('/transactions')) {
                        addNotification('A transaction was successfully recorded or updated.');
                    } else if (response.config.url.includes('/investments')) {
                        addNotification('Your investment portfolio was updated.');
                    } else if (response.config.url.includes('/goals')) {
                        addNotification('A savings goal was updated.');
                    }
                }
                return response;
            },
            (error) => Promise.reject(error)
        );
        return () => API.interceptors.response.eject(interceptor);
    }, [addNotification]);

    return children;
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
          <AxiosInterceptor>
            <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/income" element={<Income />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Routes>
        </AxiosInterceptor>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
