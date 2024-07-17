import React from "react";
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp
          <span className="text-blue-400"> ChatterBox</span>
        </h1>

        <form>
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
            />
          </div>

          <GenderCheckbox/>
          
          <a
            href=""
            className="text-white text-sm hover:underline hover:text-blue-300 mt-2 inline-block"
          >
            Already have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;