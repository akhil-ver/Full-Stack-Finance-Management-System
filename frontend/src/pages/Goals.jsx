import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [savedAmount, setSavedAmount] = useState('0');
    const [deadline, setDeadline] = useState('');

    const fetchGoals = async () => {
        try {
            const { data } = await API.get('/goals');
            setGoals(data);
        } catch (error) {
            toast.error('Failed to fetch goals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/goals', {
                goalName,
                targetAmount: parseFloat(targetAmount),
                savedAmount: parseFloat(savedAmount) || 0,
                deadline
            });
            toast.success('Goal added successfully');
            setGoalName('');
            setTargetAmount('');
            setSavedAmount('0');
            setDeadline('');
            fetchGoals();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add goal');
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/goals/${id}`);
            toast.success('Goal deleted');
            fetchGoals();
        } catch (error) {
            toast.error('Failed to delete goal');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Savings Goals</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Create New Goal</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Goal Name</label>
                            <input type="text" required placeholder="e.g. New Car" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={goalName} onChange={(e) => setGoalName(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Target Amount ($)</label>
                            <input type="number" step="0.01" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Already Saved ($)</label>
                            <input type="number" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={savedAmount} onChange={(e) => setSavedAmount(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deadline</label>
                            <input type="date" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors">
                            Add Goal
                        </button>
                    </form>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 overflow-hidden"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Your Goals</h3>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : goals.length === 0 ? (
                            <div className="text-center py-4 text-gray-500">No savings goals set yet.</div>
                        ) : (
                            goals.map((goal) => {
                                const progress = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));
                                return (
                                    <div key={goal.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow relative">
                                        <button onClick={() => handleDelete(goal.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                                            ✕
                                        </button>
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold text-gray-800">{goal.goalName}</h4>
                                            <span className="text-sm text-gray-500">Due: {goal.deadline}</span>
                                        </div>
                                        <div className="flex justify-between text-sm mb-1 text-gray-600">
                                            <span>${goal.savedAmount.toFixed(2)} saved</span>
                                            <span>Target: ${goal.targetAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                                        </div>
                                        <div className="text-right text-xs mt-1 text-blue-600 font-medium">{progress}% Complete</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Goals;
