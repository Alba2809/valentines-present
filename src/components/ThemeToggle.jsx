import { useEffect, useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.currentTheme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? "dark" : "light";
    setIsDark(!isDark);
    localStorage.currentTheme = newTheme;
    document.documentElement.classList.toggle("dark", !isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 rounded-full bg-white/60 backdrop-blur-sm dark:bg-gray-800/90 dark:backdrop-blur-sm text-gray-800 dark:text-gray-200 size-12 flex items-center justify-center cursor-pointer shadow hover:bg-white hover:dark:bg-gray-700/90 transition-all duration-300 ease-in-out"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <div className="text-3xl">🌼</div>
      ) : (
        <div className="text-3xl pt-1">🏶</div>
      )}
    </button>
  );
}

export default ThemeToggle;
