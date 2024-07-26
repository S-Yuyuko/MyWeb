// src/components/ProjectList.js
import React from 'react';
import { FaFolderOpen } from 'react-icons/fa';
import './styles/ProjectList.css';

const ProjectList = ({ projects, identity, handleSelectProject, handleDeleteProject, setIsAdding }) => {
  const projectTypeProjects = projects.filter(project => project.type === 'project');
  const professionalTypeProjects = projects.filter(project => project.type === 'professional');

  return (
    <div className="project-list-container">
      <div className="project-list-section">
        <h2>Projects</h2>
        <div className="project-list">
          {projectTypeProjects.length > 0 ? (
            projectTypeProjects.map((project) => (
              <div key={project.id} className="project-card" onClick={() => handleSelectProject(project)}>
                <h3>{project.title}</h3>
                {identity === 'admin' && (
                  <button className="delete-project-button" onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}>Delete</button>
                )}
              </div>
            ))
          ) : (
            <div className="no-data-icon">
              <FaFolderOpen />
            </div>
          )}
        </div>
      </div>
      <div className="project-list-section">
        <h2>Professional Experiences</h2>
        <div className="project-list">
          {professionalTypeProjects.length > 0 ? (
            professionalTypeProjects.map((project) => (
              <div key={project.id} className="project-card" onClick={() => handleSelectProject(project)}>
                <h3>{project.title}</h3>
                {identity === 'admin' && (
                  <button className="delete-project-button" onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}>Delete</button>
                )}
              </div>
            ))
          ) : (
            <div className="no-data-icon">
              <FaFolderOpen />
            </div>
          )}
        </div>
      </div>
      {identity === 'admin' && (
        <div className="add-project-container">
          <button onClick={() => setIsAdding(true)} className="add-project-button">Add Project</button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
