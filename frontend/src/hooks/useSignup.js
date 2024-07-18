import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthContext();

    const signup = async (inputs) => {
        const success = handleInputError(inputs);
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            });
            const data = await res.json();

            // console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }
            else {
                // set user to local storage.
                localStorage.setItem("user", JSON.stringify(data));

                // context
                setUser(data);
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup };
}

function handleInputError(inputs) {
    if (!inputs.fullName || !inputs.username || !inputs.password || !inputs.confirmPassword || !inputs.gender) {
        toast.error("Some of the fields are missing!");
        return false;
    }
    if (inputs.password !== inputs.confirmPassword) {
        toast.error("Passwords do not match!");
        return false;
    }
    if (inputs.password.length < 6) {
        toast.error("Password must be at least 6 characters long!");
        return false;
    }
    return true;
}


export default useSignup