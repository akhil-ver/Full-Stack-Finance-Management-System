import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { motion } from 'framer-motion';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell 
} from 'recharts';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState({
        totalIncome: 0,
        totalExpense: 0,
        savings: 0
    });
    const [expenses, setExpenses] = useState([]);
    
    
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await API.get('/analytics/monthly');
                setAnalytics(data);
                
                const expRes = await API.get('/analytics/expenses');
                const expData = Object.keys(expRes.data).map(key => ({
                    name: key,
                    value: expRes.data[key]
                }));
                setExpenses(expData);
            } catch (error) {
                console.error("Error fetching analytics", error);
            }
        };
        fetchAnalytics();
    }, []);

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    const StatCard = ({ title, amount, type }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className={`text-3xl font-bold mt-2 ${
                type === 'income' ? 'text-green-600' : 
                type === 'expense' ? 'text-red-600' : 'text-gray-900'
            }`}>
                ${amount?.toFixed(2)}
            </p>
        </motion.div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Income" amount={analytics.totalIncome} type="income" />
                <StatCard title="Total Expenses" amount={analytics.totalExpense} type="expense" />
                <StatCard title="Net Savings" amount={analytics.savings} type="neutral" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Expenses by Category</h3>
                    <div className="h-72">
                        {expenses.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={expenses}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {expenses.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                                No expense data available
                            </div>
                        )}
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Cash Flow (Mocked)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Jan', income: 4000, expense: 2400 },
                                { name: 'Feb', income: 3000, expense: 1398 },
                                { name: 'Mar', income: 2000, expense: 9800 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
