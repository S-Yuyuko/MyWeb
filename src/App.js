import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AppProvider } from './context/AppContext';
import { ProjectProvider } from './context/ProjectContext';

import Navbar from './components/Navbar';
import AppRoutes from './navigation/Routes';

function App() {
  return (
    <Router>
      <AppProvider>
        <ProjectProvider>
          <Navbar />
          <div className="App">
            <AppRoutes />
          </div>
        </ProjectProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
