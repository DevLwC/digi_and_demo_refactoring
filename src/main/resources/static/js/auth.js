document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const message = document.getElementById('message');
        if (response.ok) {
            message.innerHTML = '<div class="alert alert-success">Login erfolgreich!</div>';
            setTimeout(() => window.location.href = '/dashboard', 1000);
        } else {
            const error = await response.text();
            message.innerHTML = `<div class="alert alert-danger">${error}</div>`;
        }
    } catch (error) {
        console.error('Login error:', error);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });

        const message = document.getElementById('message');
        if (response.ok) {
            message.innerHTML = '<div class="alert alert-success">Registrierung erfolgreich! Sie können sich jetzt anmelden.</div>';
            setTimeout(() => window.location.href = '/login', 2000);
        } else {
            const error = await response.text();
            message.innerHTML = `<div class="alert alert-danger">${error}</div>`;
        }
    } catch (error) {
        console.error('Register error:', error);
    }
}
