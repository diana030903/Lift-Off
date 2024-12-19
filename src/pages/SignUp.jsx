import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    localStorage.setItem("user", JSON.stringify({
      username: formData.username,
      email: formData.email,
      isAuthenticated: true
    }));

    navigate("/profile");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
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
          Sign up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
              placeholder="Enter username"
            />
          </div>
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

          <div>
            <label className="block text-gray-400 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00df9a] hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#00df9a] hover:text-green-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;