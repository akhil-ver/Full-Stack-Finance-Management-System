import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login({ email, password });
        if (success) navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl"
            >
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-primary mb-2">Financial Management System</h1>
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Please sign in to your account</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                                <div className={`block w-10 h-6 rounded-full transition-colors ${rememberMe ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${rememberMe ? 'transform translate-x-4' : ''}`}></div>
                            </div>
                            <div className="ml-3 text-gray-700 font-medium text-sm">
                                Remember Me
                            </div>
                        </label>
                        
                        <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
                            Forgot password?
                        </a>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                    >
                        Sign In
                    </button>
                </form>
                
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-primary hover:text-primary-dark">
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
