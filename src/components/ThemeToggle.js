// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import './styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { toggleTheme, isDarkMode } = useContext(AppContext);

  return (
    <button className="theme-toggle-button" onClick={toggleTheme} aria-label="Toggle theme">
      <FaLightbulb className={`theme-icon ${isDarkMode ? 'dark-mode-icon' : 'light-mode-icon'}`} />
    </button>
  );
};

export default ThemeToggle;
