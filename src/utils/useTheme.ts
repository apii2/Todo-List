import { useEffect, useState } from "react";

export type ThemeType = "light" | "dark";

export default function useTheme() {
  const [theme, setTheme] = useState<ThemeType>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as ThemeType | null;
    let initialTheme: ThemeType = "light";
    
    if (!storedTheme) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      initialTheme = prefersDark ? "dark" : "light";
      localStorage.setItem("theme", initialTheme);
    } else {
      initialTheme = storedTheme;
    }
    
    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, setTheme, toggleTheme, isInitialized };
}
