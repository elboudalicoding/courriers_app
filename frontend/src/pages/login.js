import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { login } from "../utils/api";
import { saveToken } from "../utils/auth";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: authenticate } = useAuth();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const { token } = await login(values);
      saveToken(token); // Save token to localStorage
      authenticate(); // Update AuthContext
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              className="block w-full mt-2 px-3 py-1.5 rounded-md border border-gray-300"
              onChange={handleInput}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              onChange={handleInput}
              name="password"
              type="password"
              required
              placeholder="Password"
              className="block w-full mt-2 px-3 py-1.5 rounded-md border border-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
