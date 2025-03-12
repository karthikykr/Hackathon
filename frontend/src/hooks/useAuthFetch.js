import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthProvider';

export function useAuthFetch() {
    const navigate = useNavigate();

    const { token } = useAuthContext();

    const authFetch = async (url, options = {}) => {
        try {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            };
            console.log(options.headers);
            const response = await fetch(url, options);
            if (response.status === 401) {
                // Redirect to login using React Router
                navigate('/login');
                return null; // Return null or handle the error as needed
            }
            return response;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error; // Re-throw or handle the error
        }
    };

    return authFetch;
}
