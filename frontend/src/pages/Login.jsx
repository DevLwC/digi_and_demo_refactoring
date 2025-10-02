import React, { useState } from 'react'
import './Login.css'

function Login() {
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage(isRegister ? 'Registration not implemented yet.' : 'Login not implemented yet.')
    }

    return (
        <div className="login-bg">
            <div className="login-center-container">
                <div className="login-logo">
                    <img
                        src="/Lumina.png"
                        alt="Nexus Logo"
                        className="logo-img"
                    />
                </div>
                <div className="login-card">
                    <div className="login-card-decor decor-leaf-top-left">🍃</div>
                    <div className="login-card-decor decor-leaf-bottom-left">🍃</div>
                    <div className="login-card-decor decor-leaf-bottom-right">🍃</div>
                    <div className="login-card-decor decor-cloud-top-right">☁️</div>
                    <h2 className="login-title">
                        {isRegister ? "Create Account" : "Welcome Back"}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {isRegister && (
                            <input
                                type="text"
                                className="login-input"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        )}
                        <input
                            type="text"
                            className="login-input"
                            placeholder="Email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="login-input"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="login-btn">
                            {isRegister ? "Register" : "Log In"}
                        </button>
                    </form>
                    <div
                        className="login-register"
                        onClick={() => setIsRegister(!isRegister)}
                        style={{ textDecoration: 'underline' }}
                    >
                        {isRegister ? "Back to Login" : "Register"}
                    </div>
                    <div id="message" className="login-message">{message}</div>
                </div>
            </div>
        </div>
    )
}

export default Login

