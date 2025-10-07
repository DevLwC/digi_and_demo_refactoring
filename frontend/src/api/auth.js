import { API_BASE_URL } from '../config';

export async function getCurrentUser() {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        credentials: 'include'
    });
    if (!res.ok) throw new Error('Not authenticated');
    return await res.json();
}
