import { useState, useEffect, use } from 'react'

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [companyName, setCompanyName] = useState('')
    const [companySize, setCompanySize] = useState('')
    const [headquarters, setHeadquarters] = useState('')
    const [foundedYear, setFoundedYear] = useState('')
    const [companyStructure, setCompanyStructure] = useState('')
    const [workEnv, setWorkEnv] = useState('')
    const [commStyle, setCommStyle] = useState('')
    const [teamStructure, setTeamStructure] = useState('')
    
    // State for companies fetched from API
    const [companies, setCompanies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const BASE_URL = import.meta.env.VITE_API_URL

    // Fetch companies when component mounts
    useEffect(() => {
        fetchCompanies()
    }, [])

    const fetchCompanies = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/auth/companies/`)
            if (!response.ok) {
                throw new Error('Failed to fetch companies')
            }
            const data = await response.json()
            setCompanies(data)
            setError(null)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching companies:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        resetForm()
    }

    const resetForm = () => {
        setCompanyName('')
        setCompanySize('')
        setHeadquarters('')
        setFoundedYear('')
        setCompanyStructure('')
        setWorkEnv('')
        setCommStyle('')
        setTeamStructure('')
    }

    const saveContext = async () => {
        try {
            // Create a new company object matching API format
            const newCompany = {
                company_name: companyName,
                company_size: companySize,
                headquarters: headquarters,
                year_founded: parseInt(foundedYear) || null,
                company_structure: companyStructure.toLowerCase(),
                work_environment: workEnv.toLowerCase(),
                communication_style: commStyle === 'Async-first' ? 'async_first' : commStyle.toLowerCase(),
                team_structure_overview: teamStructure,
                user_id: 1, // Hardcoded user ID for now
            }

            // Send POST request to API
            const response = await fetch(`${BASE_URL}/auth/companies/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCompany),
                
            })
            console.log(newCompany);

            if (!response.ok) {
                throw new Error('Failed to add company')
            }

            // Refresh companies list
            fetchCompanies()
            
            // Reset form and close modal
            resetForm()
            closeModal()
        } catch (err) {
            console.error('Error adding company:', err)
            // You could add error handling UI here
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Company Context Configuration</h1>

                {/* Main section - Companies */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-700 flex items-center">
                            <span className="bg-green-100 text-green-600 p-1 rounded-md mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </span>
                            Company Contexts
                        </h2>

                        <button
                            onClick={openModal}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Company Context
                        </button>
                    </div>

                    {/* Display companies or loading/error state */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-12 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>{error}</p>
                                <button 
                                    onClick={fetchCompanies}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : companies.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {companies.map(company => (
                                    <div key={company.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-lg text-gray-800">{company.company_name}</h3>
                                            <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="text-sm text-gray-500 mb-1">
                                            <span className="inline-block mr-2">Size: {company.company_size || 'Not specified'}</span>
                                        </div>

                                        <div className="text-sm text-gray-500 mb-1">
                                            <span className="inline-block mr-2">Location: {company.headquarters || 'Not specified'}</span>
                                        </div>

                                        <div className="text-sm text-gray-500 mb-1">
                                            <span className="inline-block">Founded: {company.year_founded || 'Not specified'}</span>
                                        </div>

                                        <div className="flex mt-3 pt-2 border-t border-gray-100">
                                            <div className="flex items-center text-xs text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                Encrypted
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="bg-gray-100 rounded-full p-4 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-medium text-gray-500">No company contexts found</p>
                                <p className="text-sm mt-1 text-gray-400">Click the "Add Company Context" button to create a new context</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Enhanced Modal for Adding Company Context */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
                        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Add Company Context
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <label className="block font-semibold mb-2 text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter company name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                                <div className="flex justify-between text-xs mt-1">
                                    <span className="text-gray-500">{companyName.length}/100 characters</span>
                                    {companyName.length > 0 && (
                                        <span className="text-green-600 font-medium flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Looking good
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold text-blue-800">Company Profile</span>
                                </div>
                                <p className="text-blue-700 text-sm ml-11">
                                    Basic information about your organization
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block font-medium mb-2 text-gray-700">Company Size</label>
                                    <div className="relative">
                                        <select
                                            value={companySize}
                                            onChange={(e) => setCompanySize(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                                        >
                                            <option value="">Select...</option>
                                            <option value="1-10">1-10 employees</option>
                                            <option value="11-50">11-50 employees</option>
                                            <option value="51-200">51-200 employees</option>
                                            <option value="201-500">201-500 employees</option>
                                            <option value="500+">500+ employees</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium mb-2 text-gray-700">Headquarters</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="City, Country"
                                            value={headquarters}
                                            onChange={(e) => setHeadquarters(e.target.value)}
                                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        />
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block font-medium mb-2 text-gray-700">Founded Year</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="2025"
                                            value={foundedYear}
                                            onChange={(e) => setFoundedYear(e.target.value)}
                                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        />
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium mb-2 text-gray-700">Company Structure</label>
                                    <div className="relative">
                                        <select
                                            value={companyStructure}
                                            onChange={(e) => setCompanyStructure(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Startup">Startup</option>
                                            <option value="Small Business">Small Business</option>
                                            <option value="Enterprise">Enterprise</option>
                                            <option value="Non-profit">Non-profit</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-purple-100 p-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold text-purple-800">Company Culture</span>
                                </div>
                                <p className="text-purple-700 text-sm ml-11">
                                    Define your organization's working style and values
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block font-medium mb-2 text-gray-700">Work Environment</label>
                                    <div className="relative">
                                        <select
                                            value={workEnv}
                                            onChange={(e) => setWorkEnv(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                                        >
                                            <option value="">Select work...</option>
                                            <option value="Remote">Remote</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Office-based">Office-based</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium mb-2 text-gray-700">Communication Style</label>
                                    <div className="relative">
                                        <select
                                            value={commStyle}
                                            onChange={(e) => setCommStyle(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                                        >
                                            <option value="">Select style...</option>
                                            <option value="Async-first">Async-first</option>
                                            <option value="Real-time">Real-time</option>
                                            <option value="Hybrid">Hybrid</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block font-medium mb-2 text-gray-700">Team Structure Overview</label>
                                <div className="relative">
                                    <textarea
                                        value={teamStructure}
                                        onChange={(e) => setTeamStructure(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Describe your team's organization and hierarchy..."
                                    ></textarea>
                                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">Optional</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 p-3 text-sm text-gray-600 mb-6 bg-green-50 rounded-lg border border-green-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>This information is encrypted and stored securely</span>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveContext}
                                className={`${!companyName.trim() ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm flex items-center`}
                                disabled={!companyName.trim()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Save Context
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}