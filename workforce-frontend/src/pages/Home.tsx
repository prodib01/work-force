import React, { useState, useEffect } from 'react';
import { Paperclip, ArrowRight, Clock, Building, Brain, Award, User, BookOpen, Puzzle, Layers, HelpCircle, ChevronDown } from 'lucide-react';

function AssessmentPage() {
    const [question, setQuestion] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState({});
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const BASE_URL = import.meta.env.VITE_API_URL;
    
    // Range state values
    const [timeValue, setTimeValue] = useState(30);
    const [performanceValue, setPerformanceValue] = useState(33);
    const [behavioralValue, setBehavioralValue] = useState(33);
    const [culturalFitValue, setCulturalFitValue] = useState(34);

    // Fetch companies data from the API
    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/auth/companies/`);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Server error: ${response.status}`);
                }
                const data = await response.json();
                console.log('Companies:', data);
                setCompanies(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching companies:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const handleCategoryToggle = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
            // Clear selected options when category is deselected
            setCategoryOptions({
                ...categoryOptions,
                [categoryId]: []
            });
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
        
        // Toggle dropdown
        setOpenDropdown(openDropdown === categoryId ? null : categoryId);
    };

    const handleOptionToggle = (categoryId, option) => {
        const currentOptions = categoryOptions[categoryId] || [];
        
        // For difficulty, replace the current selection
        if (categoryId === 'difficulty') {
            setCategoryOptions({
                ...categoryOptions,
                [categoryId]: [option]
            });
            return;
        }
        
        // For question types, toggle the option (allow multiple)
        if (currentOptions.includes(option)) {
            setCategoryOptions({
                ...categoryOptions,
                [categoryId]: currentOptions.filter(o => o !== option)
            });
        } else {
            setCategoryOptions({
                ...categoryOptions,
                [categoryId]: [...currentOptions, option]
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ 
            question, 
            selectedCategories,
            categoryOptions,
            timeValue,
            performanceValue,
            behavioralValue,
            culturalFitValue
        });
    };

    // Close dropdown when clicking outside
    const handleClickOutside = () => {
        setOpenDropdown(null);
    };

    // Function to adjust weights while maintaining performance ≤ 33%, behavioral = 33%, cultural fit = 34%
    const adjustWeights = (category, newValue) => {
        if (category === 'performance') {
            // Ensure performance doesn't exceed 33%
            const adjustedValue = Math.min(33, newValue);
            setPerformanceValue(adjustedValue);
            
            // Maintain the ratio between behavioral and cultural fit
            const remaining = 100 - adjustedValue;
            // Behavioral stays at 33% if possible
            const newBehavioral = 33;
            // Cultural fit gets the rest (should be 34% normally)
            const newCultural = remaining - newBehavioral;
            
            if (newBehavioral + newCultural === remaining) {
                setBehavioralValue(newBehavioral);
                setCulturalFitValue(newCultural);
            }
        } else if (category === 'behavioral') {
            // Keep behavioral at 33%
            setBehavioralValue(33);
            
            // Balance between performance and cultural fit
            // Performance can't exceed 33%
            setPerformanceValue(33);
            setCulturalFitValue(34);
        } else if (category === 'cultural-fit') {
            // Keep cultural fit at 34%
            setCulturalFitValue(34);
            
            // Balance between performance and behavioral
            setPerformanceValue(33);
            setBehavioralValue(33);
        }
    };

    // Build category options including company names from the API
    const getCompanyContextOptions = () => {
        
        // Add company names from the API
        const companyNames = companies.map(company => company.company_name);
        
        // Combine and return unique values
        return [...new Set([...companyNames])];
    };

    const categories = [
        { 
            id: 'question-types', 
            name: 'Question Types', 
            color: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
            activeColor: 'ring-emerald-400', 
            icon: <HelpCircle size={16} className="mr-1" />,
            options: ['Multiple-choice questions', 'Situational judgment tests', 'Open-ended questions', 'True or false questions', 'Coding challenges'],
            multiSelect: true
        },
        { 
            id: 'skills', 
            name: 'Skills and Competencies', 
            color: 'bg-amber-50 text-amber-700 border-amber-200', 
            activeColor: 'ring-amber-400', 
            icon: <Brain size={16} className="mr-1" />,
            options: ['Technical skills', 'Soft skills', 'Problem-solving', 'Communication', 'Leadership', 'Creativity', 'Adaptability'],
            multiSelect: true
        },
        { 
            id: 'difficulty', 
            name: 'Difficulty', 
            color: 'bg-orange-50 text-orange-700 border-orange-200', 
            activeColor: 'ring-orange-400', 
            icon: <Layers size={16} className="mr-1" />,
            options: ['Easy', 'Medium', 'Hard'],
            multiSelect: false
        },
        { 
            id: 'time-frame', 
            name: '30 minutes', 
            color: 'bg-sky-50 text-sky-700 border-sky-200', 
            activeColor: 'ring-sky-400', 
            icon: <Clock size={16} className="mr-1" />,
            isSlider: true
        },
        { 
            id: 'performance', 
            name: 'Performance (33%)', 
            color: 'bg-rose-50 text-rose-700 border-rose-200', 
            activeColor: 'ring-rose-400', 
            icon: <Award size={16} className="mr-1" />,
            isSlider: true
        },
        { 
            id: 'behavioral', 
            name: 'Behavioral (33%)', 
            color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', 
            activeColor: 'ring-fuchsia-400', 
            icon: <User size={16} className="mr-1" />,
            isSlider: true
        },
        { 
            id: 'cultural-fit', 
            name: 'Cultural Fit (34%)', 
            color: 'bg-violet-50 text-violet-700 border-violet-200', 
            activeColor: 'ring-violet-400', 
            icon: <BookOpen size={16} className="mr-1" />,
            isSlider: true
        },
        { 
            id: 'company-context', 
            name: 'Company Context', 
            color: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
            activeColor: 'ring-indigo-400', 
            icon: <Building size={16} className="mr-1" />,
            // Use the function to get combined options
            get options() { return getCompanyContextOptions(); },
            multiSelect: true
        },
        { 
            id: 'brain-teasers', 
            name: 'Brainteasers', 
            color: 'bg-blue-50 text-blue-700 border-blue-200', 
            activeColor: 'ring-blue-400', 
            icon: <Puzzle size={16} className="mr-1" />,
            options: ['Logic puzzles', 'Math problems', 'Lateral thinking', 'Pattern recognition'],
            multiSelect: true
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-6 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Create a new assessment
                    </h1>
                    <p className="text-gray-500">Craft engaging questions to evaluate candidates</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-8 backdrop-blur-sm bg-opacity-80">
                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                        <div className="relative">
                            <div className={`rounded-xl overflow-hidden transition-all duration-300 ${
                                isInputFocused
                                    ? 'ring-2 ring-blue-400 shadow-md'
                                    : 'shadow border border-gray-200 hover:border-blue-200'
                            }`}>
                                <div className="relative">
                                    <textarea
                                        className="w-full px-4 md:px-6 py-4 md:py-5 bg-white outline-none placeholder-gray-400 text-gray-800 text-base md:text-lg resize-none"
                                        placeholder="Enter your assessment question here..."
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        onFocus={() => setIsInputFocused(true)}
                                        onBlur={() => setIsInputFocused(false)}
                                        rows={4}
                                        style={{ lineHeight: "1.5" }}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-3 md:p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                                    <div className="text-xs md:text-sm text-gray-600 font-medium">Create your assessment question</div>
                                    <div className="flex items-center space-x-2 md:space-x-3">
                                        <button
                                            type="button"
                                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1.5 md:p-2 hover:bg-gray-100 rounded-full"
                                        >
                                            <Paperclip size={16} className="md:w-5 md:h-5" />
                                        </button>
                                        <span className="text-blue-600 text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1 bg-blue-50 rounded-md border border-blue-100 shadow-sm">Pro</span>
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-2 md:p-3 hover:shadow-lg transition-all duration-200"
                                        >
                                            <ArrowRight size={16} className="md:w-4 md:h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div onClick={handleClickOutside}>
                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                <h3 className="text-xs md:text-sm font-semibold text-gray-700">Select categories</h3>
                                <span className="text-xs text-gray-500">{selectedCategories.length} selected</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {categories.map((category) => (
                                    <div key={category.id} className="relative">
                                        <button
                                            type="button"
                                            className={`${category.color} flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 ${
                                                selectedCategories.includes(category.id)
                                                    ? `ring-2 ring-offset-1 ${category.activeColor} shadow-md`
                                                    : ''
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCategoryToggle(category.id);
                                            }}
                                        >
                                            {category.icon}
                                            {category.id === 'time-frame' ? `${timeValue} minutes` : 
                                             category.id === 'performance' ? `Performance (${performanceValue}%)` :
                                             category.id === 'behavioral' ? `Behavioral (${behavioralValue}%)` :
                                             category.id === 'cultural-fit' ? `Cultural Fit (${culturalFitValue}%)` :
                                             category.name}
                                            <ChevronDown size={14} className="ml-1" />
                                        </button>
                                        
                                        {openDropdown === category.id && (
                                            <div className="absolute z-10 mt-1 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                <div className="py-3 px-4" role="menu" aria-orientation="vertical">
                                                    {/* Loading state for company context */}
                                                    {category.id === 'company-context' && loading && (
                                                        <div className="text-center py-2">
                                                            <p className="text-sm text-gray-500">Loading companies...</p>
                                                        </div>
                                                    )}

                                                    {/* Error state for company context */}
                                                    {category.id === 'company-context' && error && (
                                                        <div className="text-center py-2">
                                                            <p className="text-sm text-red-500">Failed to load companies</p>
                                                        </div>
                                                    )}

                                                    {/* Render slider for time and percentage categories */}
                                                    {category.isSlider && (
                                                        <div>
                                                            {category.id === 'time-frame' && (
                                                                <>
                                                                    <div className="flex justify-between mb-1">
                                                                        <span className="text-xs text-gray-600 font-medium">Time Limit</span>
                                                                        <span className="text-xs text-gray-600">{timeValue} minutes</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="5" 
                                                                        max="120" 
                                                                        step="5" 
                                                                        value={timeValue}
                                                                        onChange={(e) => setTimeValue(parseInt(e.target.value))}
                                                                        className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                                                                    />
                                                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                                        <span>5m</span>
                                                                        <span>60m</span>
                                                                        <span>120m</span>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {category.id === 'performance' && (
                                                                <>
                                                                    <div className="flex justify-between mb-1">
                                                                        <span className="text-xs text-gray-600 font-medium">Performance Weight (Max 33%)</span>
                                                                        <span className="text-xs text-gray-600">{performanceValue}%</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="0" 
                                                                        max="33" 
                                                                        value={performanceValue}
                                                                        onChange={(e) => {
                                                                            adjustWeights('performance', parseInt(e.target.value));
                                                                        }}
                                                                        className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer"
                                                                    />
                                                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                                        <span>0%</span>
                                                                        <span>33%</span>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {category.id === 'behavioral' && (
                                                                <>
                                                                    <div className="flex justify-between mb-1">
                                                                        <span className="text-xs text-gray-600 font-medium">Behavioral Weight (Fixed 33%)</span>
                                                                        <span className="text-xs text-gray-600">{behavioralValue}%</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="33" 
                                                                        max="33" 
                                                                        value={behavioralValue}
                                                                        onChange={(e) => {
                                                                            adjustWeights('behavioral', parseInt(e.target.value));
                                                                        }}
                                                                        className="w-full h-2 bg-fuchsia-100 rounded-lg appearance-none cursor-pointer"
                                                                        disabled
                                                                    />
                                                                    <div className="text-xs text-gray-500 mt-2">
                                                                        This value is fixed at 33%
                                                                    </div>
                                                                </>
                                                            )}

                                                            {category.id === 'cultural-fit' && (
                                                                <>
                                                                    <div className="flex justify-between mb-1">
                                                                        <span className="text-xs text-gray-600 font-medium">Cultural Fit Weight (Fixed 34%)</span>
                                                                        <span className="text-xs text-gray-600">{culturalFitValue}%</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="34" 
                                                                        max="34" 
                                                                        value={culturalFitValue}
                                                                        onChange={(e) => {
                                                                            adjustWeights('cultural-fit', parseInt(e.target.value));
                                                                        }}
                                                                        className="w-full h-2 bg-violet-100 rounded-lg appearance-none cursor-pointer"
                                                                        disabled
                                                                    />
                                                                    <div className="text-xs text-gray-500 mt-2">
                                                                        This value is fixed at 34%
                                                                    </div>
                                                                </>
                                                            )}

                                                            {/* Show percentage distribution info */}
                                                            {['performance', 'behavioral', 'cultural-fit'].includes(category.id) && (
                                                                <div className="mt-3 text-xs text-gray-500">
                                                                    Total: {performanceValue + behavioralValue + culturalFitValue}%
                                                                    <span className="text-green-500 ml-1">
                                                                        (Perfect distribution)
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Render options for selectable categories */}
                                                    {!category.isSlider && category.options?.map((option) => {
                                                        const isSelected = (categoryOptions[category.id] || []).includes(option);
                                                        return (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                className={`w-full text-left px-4 py-2 text-sm ${
                                                                    isSelected
                                                                        ? 'bg-blue-50 text-blue-700 font-medium'
                                                                        : 'text-gray-700 hover:bg-gray-50'
                                                                } my-0.5 rounded-md`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleOptionToggle(category.id, option);
                                                                }}
                                                            >
                                                                {isSelected ? '✓ ' : ''}{option}
                                                            </button>
                                                        );
                                                    })}

                                                    {/* Divider for company context to separate standard options from fetched companies */}
                                                    {category.id === 'company-context' && companies.length > 0 && (
                                                        <div className="border-t border-gray-200 my-2 pt-2">
                                                            <p className="text-xs text-gray-500 mb-2">Your Companies</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AssessmentPage;