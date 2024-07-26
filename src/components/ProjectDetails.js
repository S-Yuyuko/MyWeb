// src/components/ProjectDetails.js
import React, { useState } from 'react';
import { FaFolderOpen } from 'react-icons/fa';
import './styles/ProjectDetails.css';

const ProjectDetails = ({ project, identity, handleEditProject, handleFileChange, handleDeleteMedia }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!project) {
    return <div className="no-project">No Project</div>;
  }

  const mediaItems = project.media.filter(mediaItem => mediaItem.type === 'image').map((mediaItem) => ({
    src: mediaItem.data,
    type: mediaItem.type,
  }));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="project-details">
      <h2>{project.title}</h2>
      <p className="detail-item"><strong>Type:</strong> <br /> {project.type}</p>
      <p className="detail-item"><strong>Time:</strong> <br /> {project.time}</p>
      <p className="detail-item"><strong>Skill:</strong> <br /> {project.skill}</p>
      <p className="detail-item"><strong>Description:</strong> <br /> {project.description.split('\n').map((line, index) => (
        <React.Fragment key={index}>{line}<br /></React.Fragment>
      ))}</p>
      <div className="project-media">
        <h3>Result Media:</h3>
        {project.media.length > 0 ? (
          project.media.map((mediaItem, index) => (
            <div key={index} className="media-item" onClick={() => mediaItem.type === 'image' && openModal()}>
              {mediaItem.type === 'image' ? (
                <img src={mediaItem.data} alt={`Media ${index}`} />
              ) : (
                <video controls>
                  <source src={mediaItem.data} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {identity === 'admin' && (
                <button className="delete-media-button" onClick={(e) => { e.stopPropagation(); handleDeleteMedia(index); }}>
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="no-media-icon">
            <FaFolderOpen />
          </div>
        )}
      </div>
      {identity === 'admin' && (
        <>
          <div className="type-selection">
            <label className={`type-option ${project.type === 'project' ? 'selected' : ''}`}>
              <span className="type-radio"></span> Project
              <input
                type="radio"
                name="type"
                value="project"
                checked={project.type === 'project'}
                onChange={(e) => handleEditProject({ ...project, type: e.target.value })}
              />
            </label>
            <label className={`type-option ${project.type === 'professional' ? 'selected' : ''}`}>
              <span className="type-radio"></span> Professional Experience
              <input
                type="radio"
                name="type"
                value="professional"
                checked={project.type === 'professional'}
                onChange={(e) => handleEditProject({ ...project, type: e.target.value })}
              />
            </label>
          </div>
          <div className="material-input">
            <label>Title</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => handleEditProject({ ...project, title: e.target.value })}
              placeholder=" "
            />
          </div>
          <div className="material-input">
            <label>Time</label>
            <input
              type="text"
              value={project.time}
              onChange={(e) => handleEditProject({ ...project, time: e.target.value })}
              placeholder=" "
            />
          </div>
          <div className="material-input">
            <label>Skill</label>
            <input
              type="text"
              value={project.skill}
              onChange={(e) => handleEditProject({ ...project, skill: e.target.value })}
              placeholder=" "
            />
          </div>
          <div className="material-input">
            <label>Description</label>
            <textarea
              value={project.description}
              onChange={(e) => handleEditProject({ ...project, description: e.target.value })}
              placeholder=" "
              rows="4"
            />
          </div>
          <div className="material-input">
            <label>Media</label>
            <input type="file" multiple onChange={(e) => handleFileChange(e)} />
          </div>
          <button className="save-button" onClick={() => handleEditProject(project)}>Save</button>
        </>
      )}
      {isModalOpen && (
        <div className="media-overlay" onClick={closeModal}>
          <div className="media-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="media-scroll-container">
              {mediaItems.map((mediaItem, index) => (
                <div key={index} className="media-container">
                  <img src={mediaItem.src} alt={`Media ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
