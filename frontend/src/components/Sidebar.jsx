import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
    HomeIcon, 
    CreditCardIcon, 
    ChartPieIcon, 
    BanknotesIcon, 
    CurrencyDollarIcon,
    ArrowRightOnRectangleIcon,
    UsersIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
        { name: 'Expenses', path: '/expenses', icon: CreditCardIcon },
        { name: 'Income', path: '/income', icon: BanknotesIcon },
        { name: 'Investments', path: '/investments', icon: ChartPieIcon },
        { name: 'Goals', path: '/goals', icon: CurrencyDollarIcon },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
            <div className="p-6 flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-xl font-bold text-gray-800">FinanceApp</span>
            </div>
            
            <nav className="flex-1 px-4 space-y-1 mt-6">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                isActive 
                                ? 'bg-primary/10 text-primary' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                    </NavLink>
                ))}

                {user?.role === 'ADMIN' && (
                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mt-4 border border-purple-200 ${
                                isActive 
                                ? 'bg-purple-50 text-purple-700' 
                                : 'text-purple-600 hover:bg-purple-50'
                            }`
                        }
                    >
                        <UsersIcon className="w-5 h-5 mr-3" />
                        Admin Panel
                    </NavLink>
                )}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
