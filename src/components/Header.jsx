
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
  
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prev) => !prev);
  // };

  return (
    <header className="flex items-center px-6 py-4 bg-[#1e1e2e] text-white relative">
      <Link to="/" className="mr-6">
        <img
          src="liftoff.png" 
          alt="Logo"
          className="h-8 w-auto" 
        />
        <h1>LiftOff</h1>
      </Link>

      {/* Центрированная поисковая строка */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl flex items-center">
        <input
          type="text"
          placeholder="Search for projects"
          className="w-full bg-[#14141c] text-gray-400 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
        />
        {/* Кнопка с лупой */}
        <button className="absolute right-1 bg-[#00df9a] hover:bg-green-600 text-white rounded-full p-3 transition-all duration-300 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 12.65z"
            />
          </svg>
        </button>
      </div>

      {!isAuthPage &&(
      <Link to="/signin" className="ml-auto">
        <button className="btn-success rounded-full px-6 py-3 bg-[#00df9a]">
            Sign In
        </button>
      </Link>
      )}
    </header>
  );
};

export default Header;
