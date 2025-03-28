import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual login logic
        console.log('Login attempt with:', { email, password });

        // Simulated successful login
        navigate('/prompts');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
                    Login to WorkForce
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg
                       hover:bg-green-700 transition-colors duration-300"
                    >
                        Login
                    </button>

                    <div className="text-center">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-green-600 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link
                        to="/signup"
                        className="text-green-600 hover:underline"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;