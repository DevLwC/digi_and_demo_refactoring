import React from 'react'
import {Link, useLocation} from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()

    const navItems = [
        {path: '/dashboard', icon: '🏠', label: 'Home'},
        {path: '/friends', icon: '👥', label: 'Friends'},
        {path: '/posts', icon: '➕', label: 'Post'},
        {path: '/store', icon: '🛒', label: 'Shop'},
        {path: '/profile', icon: '👤', label: 'Profile'}
    ]

    return (
        <nav className="navbar" style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#ffffff',
            borderTop: '1px solid #e5e7eb',
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            padding: '8px 0'
        }}>
            <div className="nav" style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                maxWidth: '100%',
                margin: '0 auto'
            }}>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: location.pathname === item.path ? '#8fd18f' : '#6b7280',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            transition: 'all 0.2s ease',
                            minWidth: '60px'
                        }}
                    >
                                <span style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '2px',
                                    filter: location.pathname === item.path ? 'none' : 'grayscale(0.3)'
                                }}>
                                    {item.icon}
                                </span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    )
}