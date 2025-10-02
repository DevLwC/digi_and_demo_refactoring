import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Profile from './pages/Profile.jsx'
import Store from './pages/Store.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Friends from './pages/Friends.jsx'
import Posts from './pages/Posts.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import Logo from './components/Logo.jsx'

function AppContent() {
    const location = useLocation()
    return (
        <>
            {location.pathname !== "/login" && <Logo />}
            <div style={{ paddingBottom: '60px' }}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
                {location.pathname !== "/login" && <Navbar />}
            </div>
        </>
    )
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App
