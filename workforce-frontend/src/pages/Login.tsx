import React, { useState } from 'react';
import {
    Facebook,
    Github,
    Twitter,
    Chrome
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/');
    };

    const socialLogins = [
        {
            name: 'Google',
            icon: <Chrome className="w-5 h-5" />,
            color: 'text-red-500 hover:bg-red-50'
        },
        {
            name: 'Facebook',
            icon: <Facebook className="w-5 h-5" />,
            color: 'text-blue-600 hover:bg-blue-50'
        },
        {
            name: 'GitHub',
            icon: <Github className="w-5 h-5" />,
            color: 'text-gray-800 hover:bg-gray-50'
        },
        {
            name: 'X (Twitter)',
            icon: <Twitter className="w-5 h-5" />,
            color: 'text-black hover:bg-gray-50'
        }
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                        <p className="text-gray-500 mt-2">Sign in to continue to your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Sign In
                        </button>

                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500 text-sm">or continue with</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {socialLogins.map((social) => (
                                <button
                                    key={social.name}
                                    type="button"
                                    className={`
                                        flex 
                                        items-center 
                                        justify-center 
                                        py-2 
                                        border 
                                        border-gray-200 
                                        rounded-md 
                                        ${social.color} 
                                        hover:shadow-md 
                                        transition-all
                                    `}
                                >
                                    {social.icon}
                                </button>
                            ))}
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Don't have an account? {' '}
                                <a
                                    href="/signup"
                                    className="text-blue-600 hover:underline"
                                >
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;