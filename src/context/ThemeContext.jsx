import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      // 1. Check localStorage first: if user chose light, restore light
      const saved = typeof window !== 'undefined' ? localStorage.getItem('portfolio-theme') : null;
      if (saved === 'light') {
        return 'light';
      }
      // 2. Default to dark for all new visitors or explicitly dark
      return 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  const transitionTimerRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {}
  }, [theme]);

  const triggerThemeChange = (nextTheme) => {
    const root = document.documentElement;
    // Enable coordinated smooth fade across all elements
    root.classList.add('theme-transitioning');
    
    setTheme(nextTheme);

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 420);
  };

  const toggleTheme = () => {
    triggerThemeChange(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: triggerThemeChange, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
