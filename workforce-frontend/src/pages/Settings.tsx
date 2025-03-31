import React, { useState } from 'react';
import {
    User,
    Settings,
    CreditCard,
    Code,
    Building,
    Moon,
    Globe,
    MousePointer,
    Shield,
    Clock,
    Package,
    Users,
    Trash,
    MessageCircle,
    Check
} from 'lucide-react';

const SettingsPage = () => {
    // State for active section and subsection
    const [activeSection, setActiveSection] = useState('account');
    const [activeSubSection, setActiveSubSection] = useState('general');

    // Toggle for dark mode demo
    const [darkMode, setDarkMode] = useState(false);

    // Language selection
    const [language, setLanguage] = useState('english');

    // Auto-select toggle
    const [autoSelect, setAutoSelect] = useState(true);

    // Sections data
    const sections = [
        { id: 'account', label: 'Account', icon: User },
        { id: 'profile', label: 'Profile', icon: Settings },
        { id: 'purchases', label: 'Purchases', icon: CreditCard },
        { id: 'api', label: 'API', icon: Code },
        { id: 'enterprise', label: 'Enterprise', icon: Building }
    ];

    // Subsections for Account
    const accountSubSections = [
        { id: 'general', label: 'General' },
        { id: 'account', label: 'Account' },
        { id: 'subscription', label: 'Subscription' }
    ];

    // Render the appropriate content based on active subsection
    const renderContent = () => {
        if (activeSection === 'account') {
            switch (activeSubSection) {
                case 'general':
                    return (
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <Moon className="mr-2 h-5 w-5 text-blue-500" />
                                    Appearance
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-700">Dark Mode</p>
                                        <p className="text-sm text-gray-500">Toggle between light and dark mode</p>
                                    </div>
                                    <button
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <Globe className="mr-2 h-5 w-5 text-blue-500" />
                                    Language
                                </h3>
                                <div className="grid gap-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="english"
                                            name="language"
                                            checked={language === 'english'}
                                            onChange={() => setLanguage('english')}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="english" className="text-gray-700">English</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="spanish"
                                            name="language"
                                            checked={language === 'spanish'}
                                            onChange={() => setLanguage('spanish')}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="spanish" className="text-gray-700">Spanish</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="french"
                                            name="language"
                                            checked={language === 'french'}
                                            onChange={() => setLanguage('french')}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="french" className="text-gray-700">French</label>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <MousePointer className="mr-2 h-5 w-5 text-blue-500" />
                                    Auto-Select
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-700">Enable Auto-Select</p>
                                        <p className="text-sm text-gray-500">Automatically select text when you click on it</p>
                                    </div>
                                    <button
                                        onClick={() => setAutoSelect(!autoSelect)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${autoSelect ? 'bg-blue-600' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${autoSelect ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                case 'account':
                    return (
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <User className="mr-2 h-5 w-5 text-blue-500" />
                                    Avatar & Username
                                </h3>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    <div className="relative group">
                                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-blue-500">
                                            <User className="h-10 w-10 text-blue-500" />
                                        </div>
                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                            <p className="text-white text-xs font-medium">Change</p>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="johnsmith"
                                            defaultValue="johnsmith"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <Shield className="mr-2 h-5 w-5 text-blue-500" />
                                    Email & Security
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="john.smith@example.com"
                                            defaultValue="john.smith@example.com"
                                        />
                                    </div>
                                    <div>
                                        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <Clock className="mr-2 h-5 w-5 text-blue-500" />
                                    AI Data Retention
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-700">Save Chat History</p>
                                            <p className="text-sm text-gray-500">Store your conversations for future reference</p>
                                        </div>
                                        <button
                                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600"
                                        >
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                                        </button>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Retention Period</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>30 days</option>
                                            <option>90 days</option>
                                            <option>1 year</option>
                                            <option>Forever</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                case 'subscription':
                    return (
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                        <Package className="mr-2 h-5 w-5 text-blue-500" />
                                        Current Plan
                                    </h3>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Pro</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />
                                        <p className="text-gray-700">Unlimited assessments</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />
                                        <p className="text-gray-700">Premium AI features</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />
                                        <p className="text-gray-700">Advanced analytics</p>
                                    </div>
                                    <div className="pt-2">
                                        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                                            Manage Subscription
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <Users className="mr-2 h-5 w-5 text-blue-500" />
                                    Active Sessions
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                        <div>
                                            <p className="font-medium text-gray-700">Current Browser</p>
                                            <p className="text-sm text-gray-500">Chrome on macOS • Active now</p>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Current</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                        <div>
                                            <p className="font-medium text-gray-700">iPhone App</p>
                                            <p className="text-sm text-gray-500">iOS 16 • 2 hours ago</p>
                                        </div>
                                        <button className="text-sm text-red-600 hover:text-red-800">Logout</button>
                                    </div>
                                    <div className="pt-2">
                                        <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                                            Logout from all devices
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <MessageCircle className="mr-2 h-5 w-5 text-blue-500" />
                                    Pro Support
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700">As a Pro member, you have access to priority support</p>
                                    <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                                        Contact Support
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <Trash className="mr-2 h-5 w-5 text-red-500" />
                                    Delete Account
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700">Once you delete your account, there is no going back. Please be certain.</p>
                                    <button className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                default:
                    return null;
            }
        } else {
            // Placeholder for other sections
            return (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings
                    </h3>
                    <p className="text-gray-700">
                        This section is under development. Please check back later.
                    </p>
                </div>
            );
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">Settings</h1>

                {/* Main sections tabs */}
                <div className="flex overflow-x-auto mb-8 pb-2 no-scrollbar">
                    <div className="flex space-x-2">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setActiveSubSection(section.id === 'account' ? 'general' : '');
                                    }}
                                    className={`
                    flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                    ${activeSection === section.id
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
                  `}
                                >
                                    <Icon className="w-5 h-5 mr-2" />
                                    {section.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Subsections for Account */}
                {activeSection === 'account' && (
                    <div className="mb-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-1 flex">
                            {accountSubSections.map((subSection) => (
                                <button
                                    key={subSection.id}
                                    onClick={() => setActiveSubSection(subSection.id)}
                                    className={`
                    flex-1 px-4 py-2 text-center rounded-md transition-colors
                    ${activeSubSection === subSection.id
                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'}
                  `}
                                >
                                    {subSection.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content area */}
                <div className="mb-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;