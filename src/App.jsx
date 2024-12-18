
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
// import { projects } from "./data";
import ThemeToggle from "./components/ThemeToggle";
import SignIn from "./pages/SignIn";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <div className="flex bg-[#181825] dark:bg-[#f5f5f5]">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/signin" element={<SignIn />} />
            <Route path="/projects" element={<Projects />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <ThemeToggle />
        </div>
      </div>
    </Router>
  );
};

export default App;