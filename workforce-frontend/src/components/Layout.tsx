import React, { useState } from 'react';
import {
    Home,
    User,
    Settings,
    ChevronLeft,
    ChevronRight,
    BarChart,
    FileText
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const SidebarItem = ({
                             icon: Icon,
                             text,
                             to,
                             active
                         }: {
        icon: React.ElementType,
        text: string,
        to: string,
        active?: boolean
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
        ${location.pathname === to
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
            }
      `}
        >
            <Icon className="mr-3 w-5 h-5" />
            {!isCollapsed && <span className="text-sm">{text}</span>}
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
                >
                    {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>

                {/* Logo */}
                <div className={`
          p-4 
          flex 
          items-center 
          justify-center 
          border-b
          ${isCollapsed ? 'justify-center' : 'justify-start'}
        `}>
                    {!isCollapsed ? (
                        <h1 className="text-xl font-bold">Dashboard</h1>
                    ) : (
                        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    )}
                </div>

                {/* Navigation Items */}
                <nav className="mt-6">
                    <ul className="space-y-2 px-3">
                        <SidebarItem
                            icon={Home}
                            text="Home"
                            to="/"
                        />
                        <SidebarItem
                            icon={User}
                            text="Profile"
                            to="/profile"
                        />
                        <SidebarItem
                            icon={BarChart}
                            text="Analytics"
                            to="/analytics"
                        />
                        <SidebarItem
                            icon={FileText}
                            text="Reports"
                            to="/settings"
                        />
                    </ul>
                </nav>
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