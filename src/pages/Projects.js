// src/pages/Projects.js
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ProjectContext } from '../context/ProjectContext';
import ProjectList from '../components/ProjectList';
import ProjectDetails from '../components/ProjectDetails';
import './styles/Projects.css';

const Projects = () => {
  const { identity } = useContext(AppContext);
  const {
    projects,
    selectedProject,
    newProject,
    isAdding,
    isScrolled,
    setIsAdding,
    setSelectedProject,
    handleSelectProject,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleFileChange,
    handleDeleteMedia,
    setNewProject,
    setIsScrolled
  } = useContext(ProjectContext);

  const [error, setError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsScrolled]);

  const handleTypeSelection = (type) => {
    setNewProject({ ...newProject, type });
  };

  const validateAndAddProject = () => {
    if (!newProject.type || !newProject.title) {
      setError('Type and Title cannot be empty.');
      return;
    }
    setError('');
    handleAddProject();
  };

  return (
    <div>
      <div className={`welcome-section ${isScrolled ? 'hidden' : ''}`}>
        <h1>Welcome to My Projects</h1>
        <p>Explore my work and projects.</p>
        <p>Delve into a collection of my most cherished and innovative projects.</p>
        <p>Each project tells a story of creativity, dedication, and expertise.</p>
        <p>Scroll down to discover how I bring ideas to life through code.</p>
      </div>
      <div id="projects-section" className={`projects-container ${isScrolled ? 'visible' : ''}`}>
        <ProjectList
          projects={projects}
          identity={identity}
          handleSelectProject={handleSelectProject}
          handleDeleteProject={handleDeleteProject}
          setIsAdding={setIsAdding}
        />
        <ProjectDetails
          project={selectedProject}
          identity={identity}
          handleEditProject={handleEditProject}
          handleFileChange={(e) => handleFileChange(e, setSelectedProject)}
          handleDeleteMedia={handleDeleteMedia}
        />
      </div>

      {isAdding && (
        <div className="modal">
          <div className="modal-content">
            {error && <p className="error-message">{error}</p>}
            <div className="type-selection">
              <label className={`type-option ${newProject.type === 'project' ? 'selected' : ''}`} onClick={() => handleTypeSelection('project')}>
                <span className="type-radio"></span> Project
              </label>
              <label className={`type-option ${newProject.type === 'professional' ? 'selected' : ''}`} onClick={() => handleTypeSelection('professional')}>
                <span className="type-radio"></span> Professional Experience
              </label>
            </div>
            <div className="material-input">
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder=" "
              />
              <label>Title</label>
            </div>
            <div className="material-input">
              <input
                type="text"
                value={newProject.time}
                onChange={(e) => setNewProject({ ...newProject, time: e.target.value })}
                placeholder=" "
              />
              <label>Time</label>
            </div>
            <div className="material-input">
              <input
                type="text"
                value={newProject.skill}
                onChange={(e) => setNewProject({ ...newProject, skill: e.target.value })}
                placeholder=" "
              />
              <label>Skill</label>
            </div>
            <div className="material-input">
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder=" "
              />
              <label>Description</label>
            </div>
            <div className="material-input">
              <input type="file" multiple onChange={(e) => handleFileChange(e, setNewProject)} />
              <label>Media</label>
            </div>
            <button className="save-button" onClick={validateAndAddProject}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
