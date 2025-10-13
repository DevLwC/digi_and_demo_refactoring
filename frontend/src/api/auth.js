import { API_BASE_URL } from '../config';

// Modified version of getCurrentUser
export const getCurrentUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            credentials: 'include'
        });

        if (!response.ok) {
            // Don't redirect, just throw an error to be handled by the component
            throw new Error('Not authenticated');
        }

        return await response.json();
    } catch (error) {
        // Just throw the error, let components decide how to handle it
        throw error;
    }
};
