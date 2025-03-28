import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 text-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to WorkForce</h1>
                <p className="text-gray-600 mb-8">
                    Streamline your hiring process with intelligent assessments and insights.
                </p>

                <div className="space-y-4">
                    <Link
                        to="/login"
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg
                       hover:bg-blue-700 transition-colors duration-300
                       inline-block text-lg font-semibold"
                    >
                        Get Started
                    </Link>

                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <span>Don't have an account?</span>
                        <Link
                            to="/signup"
                            className="text-blue-600 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
