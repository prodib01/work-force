import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from "./pages/Signup.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Settings from "./pages/Settings";
import Assessments from "./pages/Assessments";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Login page without layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/settings" element={<Settings />} />

                {/* Other routes within layout */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/assessments"
                    element={
                        <Layout>
                            <Assessments />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;