import React, { useState } from 'react';
import { Paperclip, ArrowRight, Clock, Building, Brain, Award, User, BookOpen, Puzzle, Layers, HelpCircle } from 'lucide-react';

function AssessmentPage() {
    const [question, setQuestion] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleCategoryToggle = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ question, selectedCategories });
    };

    const categories = [
        { id: 'question-types', name: 'Question Types', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', activeColor: 'ring-emerald-400', icon: <HelpCircle size={16} className="mr-1" /> },
        { id: 'skills', name: 'Skills and Competencies', color: 'bg-amber-50 text-amber-700 border-amber-200', activeColor: 'ring-amber-400', icon: <Brain size={16} className="mr-1" /> },
        { id: 'difficulty', name: 'Difficulty', color: 'bg-orange-50 text-orange-700 border-orange-200', activeColor: 'ring-orange-400', icon: <Layers size={16} className="mr-1" /> },
        { id: 'time-frame', name: '30 minutes', color: 'bg-sky-50 text-sky-700 border-sky-200', activeColor: 'ring-sky-400', icon: <Clock size={16} className="mr-1" /> },
        { id: 'performance', name: 'Performance (33%)', color: 'bg-rose-50 text-rose-700 border-rose-200', activeColor: 'ring-rose-400', icon: <Award size={16} className="mr-1" /> },
        { id: 'behavioral', name: 'Behavioral (33%)', color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', activeColor: 'ring-fuchsia-400', icon: <User size={16} className="mr-1" /> },
        { id: 'cultural-fit', name: 'Cultural Fit (34%)', color: 'bg-violet-50 text-violet-700 border-violet-200', activeColor: 'ring-violet-400', icon: <BookOpen size={16} className="mr-1" /> },
        { id: 'company-context', name: 'Company Context', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', activeColor: 'ring-indigo-400', icon: <Building size={16} className="mr-1" /> },
        { id: 'brain-teasers', name: 'Brainteasers', color: 'bg-blue-50 text-blue-700 border-blue-200', activeColor: 'ring-blue-400', icon: <Puzzle size={16} className="mr-1" /> },
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

                        <div>
                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                <h3 className="text-xs md:text-sm font-semibold text-gray-700">Select categories</h3>
                                <span className="text-xs text-gray-500">{selectedCategories.length} selected</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        className={`${category.color} flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 ${
                                            selectedCategories.includes(category.id)
                                                ? `ring-2 ring-offset-1 ${category.activeColor} shadow-md`
                                                : ''
                                        }`}
                                        onClick={() => handleCategoryToggle(category.id)}
                                    >
                                        {category.icon}
                                        {category.name}
                                    </button>
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