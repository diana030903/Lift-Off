import React from "react";
import { Link, useLocation } from "react-router-dom";
import search from "../assets/search.svg";

const Header = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
  const isAuthenticated = false;
  
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
        <button
        className="absolute right-1 w-[40px] h-[40px] rounded-full bg-[#4acd8d] flex justify-center
             items-center cursor-pointer z-10 hover:bg-green-600 transition-all duration-300"
        id="searchbutton">
        <img
        src={search} 
        alt="search"
        className="w-[15px] h-[15px] object-contain"/>
        </button>
      </div>
        {isAuthenticated ? (
          <Link to="/profile" className="ml-auto">
            <button className="btn-success">Profile</button>
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
