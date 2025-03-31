import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from "./pages/Login";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Login page without layout */}
                <Route path="/login" element={<Login />} />

                {/* Other routes within layout */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                {/* Add more routes within layout as needed */}
            </Routes>
        </Router>
    );
};

export default App;