import React, {useState} from 'react'
import './Login.css'
import {API_BASE_URL} from '../config.js'
import {useNavigate} from "react-router-dom";

function Login() {
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = isRegister ? `${API_BASE_URL}/api/auth/register` : `${API_BASE_URL}/api/auth/login`
        const payload = isRegister
            ? {username, email, password}
            : {username: email, password} // Assuming login uses email as username

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })
            const data = await response.text()
            if (response.ok) {
                setMessage(data)
                navigate('/dashboard')
            } else {
                setMessage(data)
            }
        } catch (err) {
            setMessage('Network error')
        }
    }

    return (
        <div className="login-bg">
            <div className="login-center-container">
                <div className="login-logo">
                    <img src="/Lumina.png" alt="Nexus Logo" className="logo-img"/>
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
                        style={{textDecoration: 'underline'}}
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
