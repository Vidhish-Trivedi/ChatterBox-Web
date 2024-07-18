import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setUser} = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            
            // Update auth context and local storage.
            setUser(null);
            localStorage.removeItem("user");

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, logout};
}

export default useLogout