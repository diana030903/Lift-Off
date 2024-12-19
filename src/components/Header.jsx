import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import search from "../assets/search.svg";
import avatar from "../assets/avatar.jpg";

const Header = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
  const isHomePage = location.pathname === "/"
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAvatar, setUserAvatar] = useState(avatar);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setIsAuthenticated(true);
      setUserAvatar(storedUser.avatar || avatar);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <header className="flex items-center px-6 py-4 bg-[#181822] dark:bg-[#f5f5f5] text-white dark:text-black relative">
      <Link to="/" className="mr-6 flex items-center">
        <img src="liftoff.png" alt="Logo" className="h-8 w-auto pr-2" />
        <h1>LiftOff</h1>
      </Link>

      {isHomePage && (
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl flex items-center">
        <input
          type="text"
          placeholder="Search for projects"
          className="w-full bg-[#14141c] text-gray-400 dark:bg-[#2c2c3c] rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all duration-300 "
        />
        <button
          className="absolute right-1 w-[40px] h-[40px] rounded-full bg-[#4acd8d] flex justify-center items-center cursor-pointer z-10 hover:bg-green-600 transition-all duration-300"
          id="searchbutton"
        >
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </button>
      </div>
      )}

      {isAuthenticated ? (
        <Link to="/profile" className="ml-auto">
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </Link>
      ) : (
        !isAuthPage && (
          <Link to="/signin" className="ml-auto">
            <button className="btn-success text-white rounded-full px-6 py-3 bg-[#00df9a]">
              Sign In
            </button>
          </Link>
        )
      )}
    </header>
  );
};

export default Header;