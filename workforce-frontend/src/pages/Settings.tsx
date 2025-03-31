import React, { useState, useEffect } from 'react';
import {
    User,
    Settings as SettingsIcon,
    CreditCard,
    Code,
    Building,
    Moon,
    Sun,
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

// Define section and subsection types for better structure
type SubSection = {
    id: string;
    label: string;
    icon?: React.ElementType;
};

type Section = {
    id: string;
    label: string;
    icon: React.ElementType;
    subSections: SubSection[];
};

const Settings = () => {
    // Define all sections with their subsections
    const sections: Section[] = [
        {
            id: 'account',
            label: 'Account',
            icon: User,
            subSections: [
                { id: 'general', label: 'General', icon: Moon },
                { id: 'account', label: 'Account', icon: Shield },
                { id: 'subscription', label: 'Subscription', icon: Package }
            ]
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: SettingsIcon,
            subSections: [
                { id: 'personal', label: 'Personal Info', icon: User },
                { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
            ]
        },
        {
            id: 'purchases',
            label: 'Purchases',
            icon: CreditCard,
            subSections: [
                { id: 'history', label: 'Purchase History', icon: Clock },
                { id: 'billing', label: 'Billing', icon: CreditCard }
            ]
        },
        {
            id: 'api',
            label: 'API',
            icon: Code,
            subSections: [
                { id: 'keys', label: 'API Keys', icon: Shield },
                { id: 'usage', label: 'Usage Stats', icon: Chart }
            ]
        },
        {
            id: 'enterprise',
            label: 'Enterprise',
            icon: Building,
            subSections: [
                { id: 'team', label: 'Team Members', icon: Users },
                { id: 'billing', label: 'Enterprise Billing', icon: CreditCard }
            ]
        }
    ];

    // State for active section and subsection
    const [activeSection, setActiveSection] = useState<string>('account');
    const [activeSubSection, setActiveSubSection] = useState<string>('general');

    // State variables
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('english');
    const [autoSelect, setAutoSelect] = useState(true);
    const [saveHistory, setSaveHistory] = useState(true);

    // Apply dark mode globally when it changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark-mode');
            document.body.style.backgroundColor = '#1a1a2e';
            document.body.style.color = '#e6e6e6';
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.body.style.backgroundColor = '#f9fafc';
            document.body.style.color = '#333';
        }
    }, [darkMode]);

    // Helper function to get the active section's subsections
    const getActiveSubSections = () => {
        const section = sections.find(s => s.id === activeSection);
        return section ? section.subSections : [];
    };

    // Switch section and set default subsection
    const switchSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const section = sections.find(s => s.id === sectionId);
        if (section && section.subSections.length > 0) {
            setActiveSubSection(section.subSections[0].id);
        }
    };

    // Render appropriate content based on active section and subsection
    const renderContent = () => {
        if (activeSection === 'account') {
            switch (activeSubSection) {
                case 'general':
                    return (
                        <div className="space-y-6 animate-fadeIn">
                            <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} hover:shadow-md transition-shadow`}>
                                <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    {darkMode ? <Sun className="mr-2 h-5 w-5 text-amber-400" /> : <Moon className="mr-2 h-5 w-5 text-indigo-500" />}
                                    Appearance
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dark Mode</p>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Toggle between light and dark mode</p>
                                    </div>
                                    <button
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${darkMode ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                        aria-pressed={darkMode}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-1'} shadow-sm`} />
                                    </button>
                                </div>
                            </div>

                            <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} hover:shadow-md transition-shadow`}>
                                <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    <Globe className={`mr-2 h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                    Language
                                </h3>
                                <div className="grid gap-4">
                                    {['english', 'spanish', 'french', 'german', 'japanese'].map((lang) => (
                                        <div key={lang} className="flex items-center space-x-2 group">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                                                    language === lang
                                                        ? 'border-indigo-600 bg-indigo-600'
                                                        : `border-gray-300 ${darkMode ? 'group-hover:border-indigo-400' : 'group-hover:border-indigo-400'}`
                                                }`}
                                                onClick={() => setLanguage(lang)}
                                            >
                                                {language === lang && <Check className="h-3 w-3 text-white" />}
                                            </div>
                                            <label
                                                htmlFor={lang}
                                                className={`cursor-pointer ${
                                                    language === lang
                                                        ? 'font-medium'
                                                        : ''
                                                } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                                onClick={() => setLanguage(lang)}
                                            >
                                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} hover:shadow-md transition-shadow`}>
                                <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    <MousePointer className={`mr-2 h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                    Auto-Select
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Enable Auto-Select</p>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Automatically select text when you click on it</p>
                                    </div>
                                    <button
                                        onClick={() => setAutoSelect(!autoSelect)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${autoSelect ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                        aria-pressed={autoSelect}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${autoSelect ? 'translate-x-6' : 'translate-x-1'} shadow-sm`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                case 'account':
                    return (
                        <div className="space-y-6 animate-fadeIn">
                            <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} hover:shadow-md transition-shadow`}>
                                <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    <User className={`mr-2 h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                    Avatar & Username
                                </h3>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    <div className="relative group">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center overflow-hidden border-2 border-indigo-500">
                                            <User className="h-10 w-10 text-white" />
                                        </div>
                                        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                            <p className="text-white text-xs font-medium">Change</p>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
                                        <input
                                            type="text"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                                                darkMode
                                                    ? 'bg-gray-700 border-gray-600 text-white'
                                                    : 'bg-white border-gray-300 text-gray-800'
                                            }`}
                                            placeholder="johnsmith"
                                            defaultValue="johnsmith"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} hover:shadow-md transition-shadow`}>
                                <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    <Shield className={`mr-2 h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                    Email & Security
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                                        <input
                                            type="email"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                                                darkMode
                                                    ? 'bg-gray-700 border-gray-600 text-white'
                                                    : 'bg-white border-gray-300 text-gray-800'
                                            }`}
                                            placeholder="john.smith@example.com"
                                            defaultValue="john.smith@example.com"
                                        />
                                    </div>
                                    <div>
                                        <button className={`px-4 py-2 text-white font-medium rounded-md shadow-sm hover:shadow transition-all ${
                                            darkMode
                                                ? 'bg-indigo-600 hover:bg-indigo-700'
                                                : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
                                        }`}>
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} hover:shadow-md transition-shadow`}>
                                <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    <Clock className={`mr-2 h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                    AI Data Retention
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Save Chat History</p>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Store your conversations for future reference</p>
                                        </div>
                                        <button
                                            onClick={() => setSaveHistory(!saveHistory)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${saveHistory ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                            aria-pressed={saveHistory}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${saveHistory ? 'translate-x-6' : 'translate-x-1'} shadow-sm`} />
                                        </button>
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Retention Period</label>
                                        <select className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none ${
                                            darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-800'
                                        }`}>
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
                        <div className="space-y-6 animate-fadeIn">
                            <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} hover:shadow-md transition-shadow`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={`text-lg font-semibold flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                        <Package className={`mr-2 h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                        Current Plan
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        darkMode
                                            ? 'bg-indigo-900 text-indigo-200 border border-indigo-700'
                                            : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200'
                                    }`}>Pro</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />
                                        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Unlimited assessments</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />
                                        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Premium AI features</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />
                                        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Advanced analytics</p>
                                    </div>
                                    <div className="pt-2">
                                        <button className={`px-4 py-2 text-white font-medium rounded-md shadow-sm hover:shadow transition-all ${
                                            darkMode
                                                ? 'bg-indigo-600 hover:bg-indigo-700'
                                                : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
                                        }`}>
                                            Manage Subscription
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={`p-6 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} hover:shadow-md transition-shadow`}>
                                <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    <Users className={`mr-2 h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                    Active Sessions
                                </h3>
                                <div className="space-y-4">
                                    <div className={`flex items-center justify-between p-3 rounded-md border ${
                                        darkMode
                                            ? 'bg-indigo-900/30 border-indigo-800'
                                            : 'bg-indigo-50 border-indigo-100'
                                    }`}>
                                        <div>
                                            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Current Browser</p>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Chrome on macOS • Active now</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            darkMode
                                                ? 'bg-green-900/50 text-green-300 border border-green-800'
                                                : 'bg-green-100 text-green-800 border border-green-200'
                                        }`}>Current</span>
                                    </div>
                                    <div className={`flex items-center justify-between p-3 rounded-md border ${
                                        darkMode
                                            ? 'bg-gray-800/50 border-gray-700'
                                            : 'bg-gray-50 border-gray-100'
                                    }`}>
                                        <div>
                                            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>iPhone App</p>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>iOS 16 • 2 hours ago</p>
                                        </div>
                                        <button className="text-sm text-red-600 hover:text-red-800 font-medium">Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                default:
                    return null;
            }
        } else {
            // Content for other sections (placeholder)
            const section = sections.find(s => s.id === activeSection);
            return (
                <div className={`p-6 rounded-lg shadow-sm border animate-fadeIn ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {section?.icon && <section.icon className={`mr-2 h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />}
                        {section?.label} → {activeSubSection.charAt(0).toUpperCase() + activeSubSection.slice(1)}
                    </h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        This section is under development. Please check back later.
                    </p>
                </div>
            );
        }
    };

    return (
        <div className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-6xl mx-auto">
                <h1 className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Settings</h1>
                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Personalize your experience</p>

                {/* Main horizontal sections tabs */}
                <div className="flex overflow-x-auto mb-6 pb-2 no-scrollbar">
                    <div className="flex space-x-2">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            const isActive = activeSection === section.id;

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => switchSection(section.id)}
                                    className={`
                                        flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                                        ${isActive
                                        ? darkMode
                                            ? 'bg-indigo-700 text-white shadow-md'
                                            : 'bg-indigo-600 text-white shadow-md'
                                        : darkMode
                                            ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                    }
                                    `}
                                >
                                    <Icon className="w-5 h-5 mr-2" />
                                    {section.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Subsections tabs */}
                <div className="mb-6">
                    <div className={`rounded-lg shadow-sm border p-1 flex ${
                        darkMode
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-white border-gray-100'
                    }`}>
                        {getActiveSubSections().map((subSection) => (
                            <button
                                key={subSection.id}
                                onClick={() => setActiveSubSection(subSection.id)}
                                className={`
                                    flex-1 px-4 py-2 text-center rounded-md transition-colors
                                    ${activeSubSection === subSection.id
                                    ? darkMode
                                        ? 'bg-gray-700 text-indigo-400 font-medium'
                                        : 'bg-indigo-50 text-indigo-600 font-medium'
                                    : darkMode
                                        ? 'text-gray-300 hover:bg-gray-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }
                                `}
                            >
                                {subSection.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content area */}
                <div className="mb-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

// Missing icon component reference
const Chart = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"></path>
            <path d="M7 16l4-4 4 4 4-4"></path>
        </svg>
    );
};

export default Settings;