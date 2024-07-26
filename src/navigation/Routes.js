import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Projects from '../pages/Projects';
import AboutMe from '../pages/AboutMe';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/projects&professional" element={<Projects />} />
      <Route path="/aboutme" element={<AboutMe />} />
    </Routes>
  );
};

export default AppRoutes;
