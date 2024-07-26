import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getAboutMe, saveAboutMe } from '../utils/indexedDB';
import { FaLinkedin, FaGithub, FaEnvelope, FaUser, FaLaptopCode, FaGraduationCap, FaFileAlt } from 'react-icons/fa';
import './styles/AboutMe.css';

const AboutMe = () => {
  const { identity } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState({
    introduction: '',
    skills: '',
    education: '',
  });
  const [visibleSections, setVisibleSections] = useState({
    introduction: false,
    skills: false,
    education: false,
  });

  useEffect(() => {
    const fetchAboutMe = async () => {
      const data = await getAboutMe();
      if (data) {
        setAboutMe(data);
      }
    };
    fetchAboutMe();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.about-me-section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleChange = (key, value) => {
    setAboutMe({ ...aboutMe, [key]: value });
  };

  const handleSave = async () => {
    await saveAboutMe(aboutMe);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  const toggleSectionVisibility = (section) => {
    setVisibleSections({
      ...visibleSections,
      [section]: !visibleSections[section],
    });
  };

  return (
    <div className="about-me-container">
      <div className="about-me-section intro-section">
        {!visibleSections.introduction && (
          <h1 className="about-me-title" onClick={() => toggleSectionVisibility('introduction')}>
            <FaUser className="about-me-section-icon" />About Me
          </h1>
        )}
        <p
          className={`about-me-content ${visibleSections.introduction ? 'visible' : ''}`}
          onClick={() => toggleSectionVisibility('introduction')}
        >
          {aboutMe.introduction}
        </p>
      </div>
      <div className="about-me-section skills-section">
        {!visibleSections.skills && (
          <h2 className="about-me-subtitle" onClick={() => toggleSectionVisibility('skills')}>
            <FaLaptopCode className="about-me-section-icon" />Skills
          </h2>
        )}
        <ul
          className={`about-me-list ${visibleSections.skills ? 'visible' : ''}`}
          onClick={() => toggleSectionVisibility('skills')}
        >
          {aboutMe.skills.split(';').map((skill, index) => (
            <li key={index} className="about-me-list-item">{skill}</li>
          ))}
        </ul>
      </div>
      <div className="about-me-section education-section">
        {!visibleSections.education && (
          <h2 className="about-me-subtitle" onClick={() => toggleSectionVisibility('education')}>
            <FaGraduationCap className="about-me-section-icon" />Education
          </h2>
        )}
        <p
          className={`about-me-content ${visibleSections.education ? 'visible' : ''}`}
          onClick={() => toggleSectionVisibility('education')}
        >
          {aboutMe.education}
        </p>
      </div>
      <div className="about-me-section resume-contact-section">
        <div className="resume-section">
          <h2 className="about-me-subtitle">
            <FaFileAlt className="about-me-section-icon" />Resume
          </h2>
          <p>
            You can view my resume <a href="https://your-resume-link.com" target="_blank" rel="noopener noreferrer">here</a>.
          </p>
        </div>
        <div className="contact-section">
          <h2 className="about-me-subtitle">
            <FaEnvelope className="about-me-section-icon" />Contact Me
          </h2>
          <div className="contact-icons">
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} />
            </a>
            <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} />
            </a>
            <a href="mailto:wz1305290174@gmail.com">
              <FaEnvelope size={30} />
            </a>
          </div>
        </div>
      </div>
      {identity === 'admin' && (
        <button onClick={handleEditClick} className="edit-button">Edit</button>
      )}
      {isEditing && (
        <div className="modal-overlay" onClick={handleCloseClick}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseClick}>&times;</span>
            <div className="editor-section">
              <div className="material-input">
                <textarea
                  value={aboutMe.introduction}
                  onChange={(e) => handleChange('introduction', e.target.value)}
                  placeholder="Introduction"
                />
                <label>Introduction</label>
              </div>
              <div className="material-input">
                <textarea
                  value={aboutMe.skills}
                  onChange={(e) => handleChange('skills', e.target.value)}
                  placeholder="Skills"
                />
                <label>Skills</label>
              </div>
              <div className="material-input">
                <textarea
                  value={aboutMe.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  placeholder="Education"
                />
                <label>Education</label>
              </div>
              <button onClick={handleSave} className="save-button">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
