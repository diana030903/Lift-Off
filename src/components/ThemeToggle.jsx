import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Используем иконки солнца и луны

const ThemeToggle = () => {
  // Состояние для темы: 'light' или 'dark'
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark" // Получаем тему из localStorage
  );

  // Эффект для применения класса 'dark' к <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // Сохраняем тему в localStorage
  }, [theme]);

  // Функция для переключения темы
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 left-4 p-2 bg-gray-700 dark:bg-gray-300 rounded-full text-white dark:text-black shadow-lg"
    >
      {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;
