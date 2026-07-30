import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Income = () => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Salary');
    const [description, setDescription] = useState('');
    const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0]);

    const categories = ['Salary', 'Freelance', 'Investments', 'Business', 'Rental', 'Other'];

    const fetchIncomes = async () => {
        try {
            const { data } = await API.get('/transactions');
            setIncomes(data.filter(t => t.type === 'income'));
        } catch (error) {
            toast.error('Failed to fetch income');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/transactions', {
                type: 'income',
                amount: parseFloat(amount),
                category,
                description,
                transactionDate
            });
            toast.success('Income added successfully');
            setAmount('');
            setDescription('');
            fetchIncomes();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add income');
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/transactions/${id}`);
            toast.success('Income deleted');
            fetchIncomes();
        } catch (error) {
            toast.error('Failed to delete income');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Income Tracker</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Income</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Amount</label>
                            <input type="number" step="0.01" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Source</label>
                            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={category} onChange={(e) => setCategory(e.target.value)}>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none transition-colors">
                            Add Income
                        </button>
                    </form>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 overflow-hidden"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Income</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
                                ) : incomes.length === 0 ? (
                                    <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No income recorded yet.</td></tr>
                                ) : (
                                    incomes.map((inc) => (
                                        <tr key={inc.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inc.transactionDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {inc.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inc.description || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">+${inc.amount.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => handleDelete(inc.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Income;
