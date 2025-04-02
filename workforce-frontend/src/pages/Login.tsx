import React, { useState } from 'react';
import {
    Facebook,
    Github,
    Twitter,
    Chrome,
    Lock,
    Mail,
    Eye,
    EyeOff,
    AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${BASE_URL}/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
        });
        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('token', data.token);
            navigate('/');
        } else {
            setError(data.message || 'Invalid email or password');
        }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    const socialLogins = [
        {
            name: 'Google',
            icon: <Chrome className="w-5 h-5" />,
            color: 'text-red-500 bg-white border-gray-300 hover:bg-red-50'
        },
        {
            name: 'Facebook',
            icon: <Facebook className="w-5 h-5" />,
            color: 'text-blue-600 bg-white border-gray-300 hover:bg-blue-50'
        },
        {
            name: 'GitHub',
            icon: <Github className="w-5 h-5" />,
            color: 'text-gray-800 bg-white border-gray-300 hover:bg-gray-50'
        },
        {
            name: 'X (Twitter)',
            icon: <Twitter className="w-5 h-5" />,
            color: 'text-black bg-white border-gray-300 hover:bg-gray-50'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-xl">
                {/* Left side decorative element */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-lg">
                                <Lock className="w-6 h-6" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                        <p className="text-gray-500 mt-2 text-sm">Please sign in to your account</p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center text-sm">
                            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 text-sm transition-all duration-200"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 text-sm transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember me checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember-me"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-md"
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="mx-4 text-gray-400 text-xs font-medium">OR CONTINUE WITH</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        {/* Social Logins */}
                        <div className="grid grid-cols-4 gap-3">
                            {socialLogins.map((social) => (
                                <button
                                    key={social.name}
                                    type="button"
                                    className={`
                                        flex 
                                        items-center 
                                        justify-center 
                                        p-2
                                        border 
                                        rounded-lg 
                                        ${social.color}
                                        transition-all
                                        duration-200
                                        shadow-sm
                                    `}
                                    aria-label={`Sign in with ${social.name}`}
                                >
                                    {social.icon}
                                </button>
                            ))}
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center pt-2">
                            <p className="text-sm text-gray-600">
                                Don't have an account? {' '}
                                <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                    Create an account
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