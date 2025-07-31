import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext({
  theme: "light", // "light" or "dark"
  setTheme: () => {},
  toggleTheme: () => {},
  palette: {
    primary: "#4285F4",
    secondary: "#F1F3F4",
    accent: "#FBBC04",
  },
});

// PUBLIC_INTERFACE
export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Provide app-wide theming with palette and dark/light toggle
 */
// PUBLIC_INTERFACE
function ThemeProvider({ children }) {
  const palette = {
    primary: "#4285F4",
    secondary: "#F1F3F4",
    accent: "#FBBC04",
  };
  const [theme, setTheme] = useState(
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, palette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
