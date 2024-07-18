import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {user, setUser} = useAuthContext();

    const login = async ({ username, password }) => {
        const success = handleInputError({username, password});
        if (!success) return;

        setLoading(true);
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if(data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login };
}

function handleInputError(inputs) {
    if (!inputs.username || !inputs.password) {
        toast.error("Some of the fields are missing!");
        return false;
    }
    return true;
}

export default useLogin;