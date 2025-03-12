import { useState } from 'react';

export const useAuth = () => {
    // Initialize state from localStorage if available
    const storedToken = localStorage.getItem('token') || '';
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const [token, setTokenState] = useState(storedToken);
    const [isLoggedIn, setIsLoggedInState] = useState(storedIsLoggedIn);

    // Wrapper to set token in both state and localStorage
    const setToken = (newToken) => {
        setTokenState(newToken);
        localStorage.setItem('token', newToken);
    };

    // Wrapper to set isLoggedIn in both state and localStorage
    const setIsLoggedIn = (status) => {
        setIsLoggedInState(status);
        localStorage.setItem('isLoggedIn', status);
    };

    return {
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
    };
};
