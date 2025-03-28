import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const App: React.FC = () => {
    return (
        <div className="app min-h-screen bg-gray-100">
            <Layout>
<Routes>
    <Route path="/" element={<Home />} />
</Routes>
            </Layout>
        </div>
    );
};

export default App;
