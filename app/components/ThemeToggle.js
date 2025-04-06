'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [localTheme, setLocalTheme] = useState('light');

  let contextTheme;
  let contextToggleTheme;

  try {
    const themeContext = useTheme();
    contextTheme = themeContext.theme;
    contextToggleTheme = themeContext.toggleTheme;
  } catch (e) {
    contextTheme = localTheme;
    contextToggleTheme = () => {
      const newTheme = localTheme === 'light' ? 'dark' : 'light';
      setLocalTheme(newTheme);
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
      }
    };
  }

  const theme = contextTheme;
  const toggleTheme = contextToggleTheme;

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setLocalTheme(savedTheme);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-none dark:bg-none hover:bg-none dark:hover:bg-none transition-colors duration-200 focus:outline-none "
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon/>
      ) : (
        <Sun/>
      )}
    </button>
  );
}
