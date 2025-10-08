import React from 'react'

function Logo() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1100, padding: '10px' }}>
            <img
                src="/Lumina.png"
                alt="App Logo"
                style={{
                    width: '20vw',
                    height: 'auto',
                    maxWidth: '200px',
                    minWidth: '60px'
                }}
            />
        </div>
    )
}

export default Logo
