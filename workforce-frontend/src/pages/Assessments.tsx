import React, { useState } from 'react';
import { Search, Edit, Copy, Download, Trash2 } from 'lucide-react';

export default function SavedAssessments() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All Types');

    // Sample data
    const assessments = [
        {
            id: 1,
            title: 'Software Engineer Assessment',
            description: 'Technical assessment for senior software engineer position',
            type: 'Technical',
            role: 'Senior Software Engineer',
            created: 'Mar 20, 2024',
            modified: 'Mar 20, 2024',
            color: 'bg-blue-500'
        },
        {
            id: 2,
            title: 'Product Manager Assessment',
            description: 'Leadership and product management skills evaluation',
            type: 'Management',
            role: 'Product Manager',
            created: 'Mar 19, 2024',
            modified: 'Mar 19, 2024',
            color: 'bg-purple-500'
        },
        {
            id: 3,
            title: 'UX Designer Assessment',
            description: 'Evaluating design thinking and UI/UX capabilities',
            type: 'Design',
            role: 'Senior UX Designer',
            created: 'Mar 18, 2024',
            modified: 'Mar 18, 2024',
            color: 'bg-green-500'
        },
        {
            id: 4,
            title: 'Data Scientist Assessment',
            description: 'Technical and analytical skills for data science role',
            type: 'Technical',
            role: 'Data Scientist',
            created: 'Mar 17, 2024',
            modified: 'Mar 17, 2024',
            color: 'bg-yellow-500'
        },
        {
            id: 5,
            title: 'Frontend Developer Assessment',
            description: 'React and UI development assessment',
            type: 'Technical',
            role: 'Frontend Developer',
            created: 'Mar 16, 2024',
            modified: 'Mar 16, 2024',
            color: 'bg-red-500'
        },
        {
            id: 6,
            title: 'Marketing Specialist Assessment',
            description: 'Digital marketing and campaign management',
            type: 'Marketing',
            role: 'Marketing Specialist',
            created: 'Mar 15, 2024',
            modified: 'Mar 15, 2024',
            color: 'bg-indigo-500'
        }
    ];

    // Filter assessments based on search query and selected type
    const filteredAssessments = assessments.filter(assessment => {
        const matchesSearch = assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assessment.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All Types' || assessment.type === selectedType;
        return matchesSearch && matchesType;
    });

    const types = ['All Types', 'Technical', 'Management', 'Design', 'Marketing', 'Leadership', 'Behavioral'];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Saved Assessments</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your assessment templates</p>
                </div>

                {/* Search and filter */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search assessments..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full sm:w-48">
                        <select
                            className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            {types.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Assessment cards - using flex approach instead of grid for more reliable layout */}
                <div className="flex flex-wrap -mx-2">
                    {filteredAssessments.map(assessment => (
                        <div
                            key={assessment.id}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-2 mb-4"
                        >
                            <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                                <div className={`${assessment.color} h-1 w-full`}></div>
                                <div className="p-4">
                                    <h2 className="text-base font-semibold text-gray-800 mb-1 truncate" title={assessment.title}>
                                        {assessment.title}
                                    </h2>
                                    <p className="text-xs text-gray-600 mb-3 line-clamp-2" title={assessment.description}>
                                        {assessment.description}
                                    </p>

                                    <div className="space-y-1 mb-3 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Type:</span>
                                            <span className="font-medium">{assessment.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Role:</span>
                                            <span className="font-medium truncate max-w-[65%]" title={assessment.role}>{assessment.role}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Created:</span>
                                            <span>{assessment.created}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Modified:</span>
                                            <span>{assessment.modified}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-t pt-2">
                                        <button className="p-1 text-gray-500 hover:text-blue-600 rounded-full transition-colors" title="Edit">
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-1 text-gray-500 hover:text-indigo-600 rounded-full transition-colors" title="Copy">
                                            <Copy size={16} />
                                        </button>
                                        <button className="p-1 text-gray-500 hover:text-green-600 rounded-full transition-colors" title="Download">
                                            <Download size={16} />
                                        </button>
                                        <button className="p-1 text-gray-500 hover:text-red-600 rounded-full transition-colors" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state (when no assessments match filters) */}
                {filteredAssessments.length === 0 && (
                    <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                            <Search size={20} className="text-gray-400" />
                        </div>
                        <h3 className="text-base font-medium text-gray-800 mb-1">No assessments found</h3>
                        <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}