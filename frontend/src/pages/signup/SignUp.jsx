import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });

    const handleCheckboxChange = (gen) => {
        setInputs({ ...inputs, gender: gen});
    }

    const {loading, signup} = useSignup();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(inputs);
        await signup(inputs);
    }

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    SignUp
                    <span className="text-blue-400"> ChatterBox</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-white font-light">
                                Full Name
                            </span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full h-10"
                            placeholder="Your Full Name"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-white font-light">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full h-10"
                            placeholder="Username"
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-white font-light">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full h-10"
                            placeholder="Password"
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-white font-light">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full h-10"
                            placeholder="Confirm Password"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <Link
                        to="/login"
                        className="text-white text-sm hover:underline hover:text-blue-300 mt-2 inline-block"
                    >
                        Already have an account?
                    </Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
