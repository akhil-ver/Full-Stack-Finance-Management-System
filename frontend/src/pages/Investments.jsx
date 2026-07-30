import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Investments = () => {
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [investmentType, setInvestmentType] = useState('Stock');
    const [investmentName, setInvestmentName] = useState('');
    const [investedAmount, setInvestedAmount] = useState('');
    const [currentValue, setCurrentValue] = useState('');

    const types = ['Stock', 'Mutual Fund', 'Crypto', 'Gold', 'Real Estate', 'Bonds'];

    const fetchInvestments = async () => {
        try {
            const { data } = await API.get('/investments');
            setInvestments(data);
        } catch (error) {
            toast.error('Failed to fetch investments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const profitLoss = parseFloat(currentValue) - parseFloat(investedAmount);
            await API.post('/investments', {
                investmentType,
                investmentName,
                investedAmount: parseFloat(investedAmount),
                currentValue: parseFloat(currentValue),
                profitLoss
            });
            toast.success('Investment added successfully');
            setInvestmentName('');
            setInvestedAmount('');
            setCurrentValue('');
            fetchInvestments();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add investment');
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/investments/${id}`);
            toast.success('Investment deleted');
            fetchInvestments();
        } catch (error) {
            toast.error('Failed to delete investment');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Investment Tracker</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Add Investment</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={investmentType} onChange={(e) => setInvestmentType(e.target.value)}>
                                {types.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name / Ticker</label>
                            <input type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={investmentName} onChange={(e) => setInvestmentName(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Invested Amount ($)</label>
                            <input type="number" step="0.01" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={investedAmount} onChange={(e) => setInvestedAmount(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Current Value ($)</label>
                            <input type="number" step="0.01" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none transition-colors">
                            Save Investment
                        </button>
                    </form>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 overflow-hidden"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Portfolio</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invested</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
                                ) : investments.length === 0 ? (
                                    <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No investments added yet.</td></tr>
                                ) : (
                                    investments.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="font-medium">{inv.investmentName}</div>
                                                <div className="text-xs text-gray-500">{inv.investmentType}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${inv.investedAmount.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">${inv.currentValue.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${inv.profitLoss >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {inv.profitLoss >= 0 ? '+' : ''}${inv.profitLoss.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => handleDelete(inv.id)} className="text-red-600 hover:text-red-900">Delete</button>
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

export default Investments;
