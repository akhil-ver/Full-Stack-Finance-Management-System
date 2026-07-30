import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import { ThemeContext } from '../context/ThemeContext';
import { BellIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { notifications, markAllRead, unreadCount } = useContext(NotificationContext);
    const { isGreyTheme, setIsGreyTheme } = useContext(ThemeContext);
    
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifs, setShowNotifs] = useState(false);
    
    const profileRef = useRef(null);
    const notifRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifs(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNotifClick = () => {
        setShowNotifs(!showNotifs);
        if (!showNotifs) {
            markAllRead();
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm relative z-50">
            <div className="flex-1"></div>
            
            <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <label className="flex items-center cursor-pointer mr-2">
                    <div className="relative">
                        <input type="checkbox" className="sr-only" checked={isGreyTheme} onChange={() => setIsGreyTheme(!isGreyTheme)} />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${isGreyTheme ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isGreyTheme ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                </label>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button 
                        onClick={handleNotifClick}
                        className="p-2 text-gray-400 hover:text-gray-600 relative transition-colors focus:outline-none"
                    >
                        <BellIcon className="h-6 w-6" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </button>
                    
                    <AnimatePresence>
                        {showNotifs && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                            >
                                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                                    <span className="text-xs text-gray-500">{notifications.length} recent</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto p-2">
                                    {notifications.length === 0 ? (
                                        <div className="p-4 text-center text-sm text-gray-500">No new notifications</div>
                                    ) : (
                                        notifications.map(notif => (
                                            <div key={notif.id} className="p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg transition-colors">
                                                <p className="text-sm text-gray-800">{notif.message}</p>
                                                <span className="text-xs text-gray-400 mt-1 block">
                                                    {new Date(notif.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {/* User Profile */}
                <div className="relative border-l border-gray-200 pl-4" ref={profileRef}>
                    <button 
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center space-x-3 focus:outline-none hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
                        </div>
                        <UserCircleIcon className="h-8 w-8 text-primary" />
                    </button>
                    
                    <AnimatePresence>
                        {showProfile && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 py-1"
                            >
                                <div className="px-4 py-3 border-b border-gray-100 md:hidden">
                                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                                    Sign out
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
