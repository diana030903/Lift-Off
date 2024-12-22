import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <ul className="menu bg-[#181822] dark:bg-[#f5f5f5] rounded-box gap-24 shadow-2xl shadow-2xl hover:bg-[#23252f] dark:hover:bg-[#ddd] transition-colors p-3">
      <li className={getLinkClass('/')}>
        <Link to="/" className="tooltip tooltip-right" data-tip="Home">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve" width="24" height="24" fill="none">
            <polyline fill="none" stroke="#00df9a" stroke-width="2" stroke-miterlimit="10" points="3,17 16,4 29,17 "/>
            <polyline fill="none" stroke="#00df9a" stroke-width="2" stroke-miterlimit="10" points="6,14 6,27 13,27 13,17 19,17 19,27 26,27 26,14 "/>
          </svg>
        </Link>
      </li>

      <li className={getLinkClass('/favorites')}>
        <Link to="/favorites" className="tooltip tooltip-right" data-tip="Favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 37 32" xml:space="preserve" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none">
            <path stroke="#00df9a" strokeWidth="2" d="M33.582 2.483A9.8 9.8 0 0 0 27.101.065c-2.767 0-5.49 1.134-7.472 3.112l-.781.778a.5.5 0 0 1-.697 0l-1.027-1.024A9.98 9.98 0 0 0 10.032 0C7.415 0 4.938 1 3.059 2.814 1.189 4.619.148 7.101.126 9.802c-.023 2.824 1.095 5.573 3.067 7.541l14.252 14.22c.283.282.658.437 1.055.437s.772-.155 1.055-.437L34.061 17.09a10.04 10.04 0 0 0 2.934-7.399c-.089-2.794-1.302-5.353-3.413-7.208m-.227 13.899L18.849 30.855a.5.5 0 0 1-.697 0L3.899 16.635c-1.784-1.779-2.794-4.267-2.773-6.824.02-2.431.953-4.66 2.627-6.277A9 9 0 0 1 10.032 1c2.413 0 4.681.938 6.387 2.64l1.026 1.024c.565.564 1.545.564 2.11 0l.78-.778c1.796-1.792 4.263-2.82 6.766-2.82 2.161 0 4.228.77 5.821 2.169a8.93 8.93 0 0 1 3.073 6.488 8.9 8.9 0 0 1-2.64 6.659"></path>
          </svg>
        </Link>
      </li>

      <li className={getLinkClass('/stats')}>
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
