import React, { useState } from 'react';

interface Prompt {
    id: number;
    role: string;
    description: string;
}

const PromptsPage: React.FC = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [newPrompt, setNewPrompt] = useState({
        role: '',
        description: ''
    });

    const handleAddPrompt = (e: React.FormEvent) => {
        e.preventDefault();

        const prompt: Prompt = {
            id: Date.now(),
            role: newPrompt.role,
            description: newPrompt.description
        };

        setPrompts([...prompts, prompt]);
        setNewPrompt({ role: '', description: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
                <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
                    Assessment Prompts
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Prompt Creation Form */}
                    <div>
                        <h2 className="text-2xl font-semibold text-purple-500 mb-4">
                            Create New Prompt
                        </h2>
                        <form onSubmit={handleAddPrompt} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Role</label>
                                <input
                                    type="text"
                                    value={newPrompt.role}
                                    onChange={(e) => setNewPrompt({...newPrompt, role: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter role (e.g., Software Engineer)"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Prompt Description</label>
                                <textarea
                                    value={newPrompt.description}
                                    onChange={(e) => setNewPrompt({...newPrompt, description: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Describe the assessment prompt"
                                    rows={4}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-3 rounded-lg
                           hover:bg-purple-700 transition-colors duration-300"
                            >
                                Add Prompt
                            </button>
                        </form>
                    </div>

                    {/* Prompt List */}
                    <div>
                        <h2 className="text-2xl font-semibold text-purple-500 mb-4">
                            Your Prompts
                        </h2>
                        {prompts.length === 0 ? (
                            <div className="text-center text-gray-500">
                                No prompts created yet. Start by adding a new prompt!
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {prompts.map((prompt) => (
                                    <div
                                        key={prompt.id}
                                        className="bg-purple-50 p-4 rounded-lg border border-purple-200"
                                    >
                                        <h3 className="text-lg font-bold text-purple-600 mb-2">
                                            {prompt.role}
                                        </h3>
                                        <p className="text-gray-700">{prompt.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromptsPage;