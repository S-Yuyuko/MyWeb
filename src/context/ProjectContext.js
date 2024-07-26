// src/context/ProjectContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getProjects, addProject, editProject, deleteProject } from '../utils/indexedDB';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({ title: '', tytle: '', time: '', skill: '', description: '', media: [] });
  const [isAdding, setIsAdding] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects();
      setProjects(projects);
      if (projects.length > 0) {
        setSelectedProject(projects[0]);
      }
    };
    fetchProjects();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleAddProject = async () => {
    await addProject(newProject);
    const updatedProjects = await getProjects();
    setProjects(updatedProjects);
    setIsAdding(false);
    setNewProject({ title: '', tytle: '', time: '', skill: '', description: '', media: [] });
        if (updatedProjects.length > 0) {
      setSelectedProject(updatedProjects[updatedProjects.length - 1]);
    }
  };

  const handleEditProject = async (updatedProject) => {
    await editProject(updatedProject);
    const updatedProjects = await getProjects();
    setProjects(updatedProjects);
    setSelectedProject(updatedProject);
  };

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    const updatedProjects = await getProjects();
    setProjects(updatedProjects);
    if (updatedProjects.length > 0) {
      setSelectedProject(updatedProjects[0]);
    } else {
      setSelectedProject(null);
    }
  };

  const handleFileChange = (e, setProjectData) => {
    const files = Array.from(e.target.files);
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const mediaItem = {
            type: file.type.startsWith('video') ? 'video' : 'image',
            data: reader.result
          };
          resolve(mediaItem);
        };
        reader.onerror = error => reject(error);
      });
    });

    Promise.all(promises).then(mediaItems => {
      setProjectData(prevData => ({ ...prevData, media: [...prevData.media, ...mediaItems] }));
    });
  };

  const handleDeleteMedia = (index) => {
    setSelectedProject(prevData => {
      const newMedia = [...prevData.media];
      newMedia.splice(index, 1);
      return { ...prevData, media: newMedia };
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        newProject,
        isAdding,
        isScrolled,
        setIsScrolled,
        setIsAdding,
        setSelectedProject,
        handleSelectProject,
        handleAddProject,
        handleEditProject,
        handleDeleteProject,
        handleFileChange,
        handleDeleteMedia,
        setNewProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
