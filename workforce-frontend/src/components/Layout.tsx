import React, { useState } from 'react';
import {
    PlusCircle,
    Library,
    Settings,
    ChevronLeft,
    ChevronRight,
    BookmarkCheck,
    Building2,
    User,
    LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // Correct placement inside the component

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const SidebarItem = ({
                             icon: Icon,
                             text,
                             to
                         }: {
        icon: React.ElementType,
        text: string,
        to: string
    }) => (
        <Link
            to={to}
            className={`
                flex items-center 
                p-2 
                rounded-md 
                cursor-pointer 
                transition-colors 
                duration-200
                ${isCollapsed ? 'justify-center' : ''}
                ${location.pathname === to
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
            }
            `}
            title={isCollapsed ? text : ""}
        >
            <Icon className={`w-5 h-5 ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className="text-sm truncate">{text}</span>}
        </Link>
    );

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className={`
                fixed 
                top-0 
                left-0 
                h-full 
                bg-white 
                shadow-lg 
                transition-all 
                duration-300 
                z-40
                flex
                flex-col
                ${isCollapsed ? 'w-16' : 'w-64'}
            `}>
                {/* Collapse Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className={`
                        absolute 
                        top-4 
                        -right-4 
                        bg-white 
                        border 
                        rounded-full 
                        p-1 
                        shadow-lg 
                        z-10
                        ${isCollapsed ? 'rotate-180' : ''}
                    `}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                {/* Logo Section */}
                <div className={`
                    py-4
                    px-3
                    flex
                    items-center
                    border-b
                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}>
                    {/* Logo */}
                    <div className="flex items-center justify-center w-8 h-8  rounded-full flex-shrink-0">
                        <img src={Logo} alt="WorkforceIQ Logo" className="w-10 h-10 object-contain" />
                    </div>

                    {/* App name - only show when expanded */}
                    {!isCollapsed && (
                        <h1 className="ml-3 text-lg font-bold truncate">WorkforceIQ.ai</h1>
                    )}
                </div>

                {/* Navigation Items */}
                <nav className="mt-6 flex-grow overflow-y-auto">
                    <ul className="space-y-2 px-3">
                        <SidebarItem
                            icon={PlusCircle}
                            text="New Assessment"
                            to="/"
                        />
                        <SidebarItem
                            icon={Library}
                            text="Assessment Library"
                            to="/profile"
                        />
                        <SidebarItem
                            icon={BookmarkCheck}
                            text="Saved Assessments"
                            to="/assessments"
                        />
                        <SidebarItem
                            icon={Building2}
                            text="Company Context"
                            to="/settings"
                        />
                    </ul>
                </nav>

                {/* Bottom Section - User Info */}
                <div className="p-3 mt-auto border-t">
                    {isCollapsed ? (
                        <div className="flex flex-col items-center space-y-4">
                            {/* Avatar */}
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0" title="John Doe">
                                <User className="w-5 h-5 text-gray-600" />
                            </div>

                            {/* Settings */}
                            <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-full"
                                 title="Settings"
                                 onClick={() => navigate('/settings')} // Navigate to settings
                            >
                                <Settings className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                            </div>

                            {/* Logout */}
                            <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-full" title="Logout">
                                <LogOut className="w-5 h-5 text-red-500 hover:text-red-700" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center p-2 rounded-lg bg-gray-100">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5 text-gray-600" />
                            </div>

                            <div className="ml-3 flex-grow min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">John Doe</p>
                            </div>

                            <div className="flex space-x-2 ml-auto">
                                <div
                                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-full"
                                    title="Settings"
                                    onClick={() => navigate('/settings')} // Navigate to settings
                                >
                                    <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
                                </div>
                                <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-full" title="Logout">
                                    <LogOut className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <main className={`
                flex-1 
                bg-gray-100 
                transition-all 
                duration-300 
                ${isCollapsed ? 'ml-16' : 'ml-64'}
            `}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
