import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      if (
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        navigate("/profile")
      } else {
        setError("Incorrect email or password.");
      }
    } else {
      setError("User no found. Please sign up first");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181825]">
      <div className="bg-[#1e1e2e] p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src="liftoff.png" alt="LiftOff Logo" className="h-12 w-auto" />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Sign in
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00df9a] hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#00df9a] hover:text-green-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
