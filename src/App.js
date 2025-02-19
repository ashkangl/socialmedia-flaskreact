import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/dashboard/Dashboard';
import Auth from './components/auth/Auth';
import Footer from './components/general/Footer';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const loggedInUser = localStorage.getItem("isAuthenticated")
        if (loggedInUser) {
            setIsAuthenticated(true)
        }
    }, [])

    return (
        <BrowserRouter>
        <div className="app-container">
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path="/auth" element={!isAuthenticated ? <Auth setIsAuthenticated={setIsAuthenticated} setUserInfo={setUserInfo} /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} userInfo={userInfo} /> : <Navigate to="/auth" />} />
            </Routes>
            <Footer />
        </div>
        </BrowserRouter>
    )
}

export default App
