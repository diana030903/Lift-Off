import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <ul className="menu bg-[#181822] dark:bg-[#f5f5f5] rounded-box flex flex-col items-center justify-center gap-16">
      <li>
        <Link to="/" className="tooltip tooltip-right" data-tip="Home">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve" width="24" height="24" fill="none">
          <polyline fill="none" stroke="#00df9a" stroke-width="2" stroke-miterlimit="10" points="3,17 16,4 29,17 "/>
          <polyline fill="none" stroke="#00df9a" stroke-width="2" stroke-miterlimit="10" points="6,14 6,27 13,27 13,17 19,17 19,27 26,27 26,14 "/>
          </svg>

        </Link>
      </li>
      <li>
        <a className="tooltip tooltip-right" data-tip="Details">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#00df9a">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </a>
      </li>
      <li>
        <a className="tooltip tooltip-right" data-tip="Stats">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#00df9a">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </a>
      </li>
      
      <li>
        <button onClick={handleLogout} className="tooltip tooltip-right" data-tip="Exit">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" fill="none">
            <path d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5" stroke="#00df9a" />
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default Sidebar;
