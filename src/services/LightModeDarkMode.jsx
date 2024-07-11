import React, { useState, useEffect, createContext, children } from "react";

export const ThemeContext = createContext();

const LightModeDarkMode = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--bg-color",
      isDarkMode ? "#333" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDarkMode ? "#fff" : "#333"
    );
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {Array.isArray(children) ? children : [children]}
    </ThemeContext.Provider>
  );
};

export default LightModeDarkMode;
