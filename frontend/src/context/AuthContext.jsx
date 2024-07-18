import {createContext, useContext, useState} from 'react';

export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
