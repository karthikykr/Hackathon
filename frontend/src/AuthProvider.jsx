import { createContext, useContext } from 'react';
import { useAuth } from './hooks/useAuth';

export const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
    const { isLoggedIn, setToken, setIsLoggedIn, token } = useAuth();

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setToken,
                token,
                setIsLoggedIn,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider');
    }
    return context;
};

export { useAuthContext, AuthProvider };
