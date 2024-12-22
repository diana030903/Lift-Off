import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import SignIn from "./pages/SignIn";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import { projects } from "./data";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

const [favorites, setFavorites] = useState([]);
const toggleFavorite = (id) => {
  setFavorites(prev => {
    const newFavorites = prev.includes(id) 
      ? prev.filter(fav => fav !== id)
      : [...prev, id];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    return newFavorites;
  });
};
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <Router>
      <div className="flex bg-[#181825] dark:bg-[#f5f5f5]">
        <ThemeToggle />
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorite" element={
               <Favorites 
                  favorites={favorites} 
                  projects={projects} 
                  toggleFavorite={toggleFavorite} 
               />
              } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;